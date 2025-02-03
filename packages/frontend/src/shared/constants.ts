export const IS_DEV = import.meta.env.DEV;

export enum LocalStorageKeys {
  StoredId = 'storedId',
}

export const USERS = {
  JaneDoe: {
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJqYW5lLmRvZUBhdXRoZGVtby5jbyIsImlhdCI6MTUxNjIzOTAyMn0.dzXotOlPjCF7t5Z2DR9_OH8eGD3abJOkqq0ZTlzVz1I',
    email: 'jane.doe@authdemo.co',
    name: 'Jane Doe',
    role: 'Supervisor',
  },
  JohnDough: {
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJqb24uZG91Z2hAYXV0aGRlbW8uY28iLCJuYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE1MTYyMzkwMjJ9.vL6_aL0kLtaV6gdJZ3hxn8nK1ZykCzxY5rpzsf-R1qs',
    email: 'jon.dough@authdemo.co',
    name: 'John Dough',
    role: 'Agent',
  },
  GeorgeKing: {
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJnZW9yZ2Uua2luZ0BhdXRoZGVtby5jbyIsImlhdCI6MTUxNjIzOTAyMn0.9IvRDAZwuTZ8eNWizSQb8YBIjJ65TIcMNuyamhxF0BE',
    email: 'george.king@authdemo.co',
    name: 'George King',
    role: 'Agent',
  },
  BarbaraBarbar: {
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJiYXJiYXJhQkBmYWtlbWFpbC5jb20iLCJpYXQiOjE1MTYyMzkwMjJ9.ScH4m3ov9mQWz1FMHzKrXBRGfUgcdd0h7TiGravA8XI',
    email: 'barbaraB@fakemail.com',
    name: 'Barbara Barbar',
    role: 'Customer',
  },
  PamWozniak: {
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJwYW0ud296QGZha2VtYWlsLmNvbSIsImlhdCI6MTUxNjIzOTAyMn0.TiR0OvYKDcq2fXMSXjJ2ygV6OaZhz65kpDiNYI2Qz_s',
    email: 'pam.woz@fakemail.com',
    name: 'Pam Wozniak',
    role: 'Customer',
  },
  MikeWozniak: {
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJtaWtlLndvekBmYWtlbWFpbC5jb20iLCJpYXQiOjE1MTYyMzkwMjJ9.1_c8d0-W7a801Xt4m53FYp9NrklJwrXf0qr50slc9D8',
    email: 'mike.woz@fakemail.com',
    name: 'Mike Wozniak',
    role: 'Customer',
  },
  HenryPaker: {
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJwYWttYW5AdW5yZWFsLnVrIiwiaWF0IjoxNTE2MjM5MDIyfQ.LiDjWf1zzf431rBMCf1erxo7fhH0jG-qpPOVHqpy1pk',
    email: 'pakman@unreal.uk',
    name: 'Henry Paker',
    role: 'Customer',
  },
  BenPartridge: {
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJiYW5qb21pbkBmYWtlbWFpbC5jb20iLCJpYXQiOjE1MTYyMzkwMjJ9.vYcGdhep2-Yb1n-RCC65AlOSosbF0uzHpuDea_SoUnk',
    email: 'banjomin@fakemail.com',
    name: 'Ben Partridge',
    role: 'Customer',
  },
};

export const accounts = [
  {
    id: 'cmnf3ra9iecyo9g0e826t69jx',
    accountType: 'Checking',
    owner: 'Barbara',
  },
  {
    id: 'cm3g28hdtfsg042ixlprajb7s',
    accountType: 'Checking',
    owner: 'Pam',
  },
  {
    id: 'cm0ifs4whyg0yc6fpfpwo9kub',
    accountType: 'Checking',
    owner: 'Mike',
  },
  {
    id: 'cmczch9pkaba3qjs9xbqyyhaa',
    accountType: 'Savings',
    owner: 'Mike',
  },
  {
    id: 'cmk5zhrxenbfrcibwl4y0wi5r',
    accountType: 'Checking',
    owner: 'Henry',
  },
  {
    id: 'cmkrfed3difqrc9ue1me67mfq',
    accountType: 'Checking',
    owner: 'Ben',
  },
];
