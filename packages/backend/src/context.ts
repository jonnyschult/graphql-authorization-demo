import type { IncomingHttpHeaders } from 'http';
import prisma from '~/prismaClient';
import type { PrismaClient, User } from '@prisma/client';
import type { BaseContext } from '@apollo/server';
import { ExpressContextFunctionArgument } from '@apollo/server/dist/esm/express4';
import jwt from 'jsonwebtoken';
import { GraphQLError } from 'graphql';

export interface Context extends BaseContext {
  headers: IncomingHttpHeaders;
  user:
    | ({
        role: {
          permissions: {
            id: string;
            action: string;
            resource: string;
          }[];
        } & {
          id: string;
          name: string;
          description: string | null;
        };
      } & {
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        roleId: string;
        createdAt: Date;
        updatedAt: Date;
      })
    | null;
  prisma: PrismaClient;
}

export async function createContext({
  req,
}: ExpressContextFunctionArgument): Promise<Context> {
  const bearerAuth = req.headers.authorization || '';
  const bearerToken = bearerAuth.split(' ')[1];
  const decoded = jwt.decode(bearerToken);

  if (
    !decoded ||
    typeof decoded === 'string' ||
    !decoded.sub ||
    typeof decoded.sub !== 'string'
  ) {
    throw new GraphQLError('JWT is invalid or missing', {
      extensions: {
        code: 'FORBIDDEN',
      },
    });
  }

  const user = await prisma.user.findFirst({
    where: {
      email: decoded?.sub,
    },
    include: {
      role: {
        include: {
          permissions: true,
        },
      },
    },
  });

  return {
    user: user,
    headers: req.headers,
    prisma: prisma,
  };
}
