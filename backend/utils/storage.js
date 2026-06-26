const memoryStore = {
  users: [],
  inquiries: [],
  contacts: [],
};

const buildId = (prefix) => `${prefix}-${Math.random().toString(36).slice(2, 10)}`;

const toPlainObject = (value) => {
  if (!value) return value;
  return JSON.parse(JSON.stringify(value));
};

export const getMemoryStore = () => memoryStore;

export const createUserRecord = (userData) => {
  const user = {
    _id: buildId("user"),
    id: buildId("user"),
    ...userData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  memoryStore.users.push(user);
  return toPlainObject(user);
};

export const findUserByEmailRecord = async (email) => {
  const user = memoryStore.users.find((item) => item.email?.toLowerCase() === email?.toLowerCase());
  return user ? toPlainObject(user) : null;
};

export const findUserByIdRecord = async (id) => {
  const user = memoryStore.users.find((item) => String(item._id) === String(id) || String(item.id) === String(id));
  return user ? toPlainObject(user) : null;
};

export const createInquiryRecord = (inquiryData) => {
  const inquiry = {
    _id: buildId("inquiry"),
    id: buildId("inquiry"),
    ...inquiryData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  memoryStore.inquiries.unshift(inquiry);
  return toPlainObject(inquiry);
};

export const listInquiryRecords = async () => {
  return toPlainObject(memoryStore.inquiries.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
};

export const createContactRecord = (contactData) => {
  const contact = {
    _id: buildId("contact"),
    id: buildId("contact"),
    ...contactData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  memoryStore.contacts.unshift(contact);
  return toPlainObject(contact);
};

export const listContactRecords = async () => {
  return toPlainObject(memoryStore.contacts.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
};
