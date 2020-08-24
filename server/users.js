const users = [];

module.exports = {
  addUser: ({ id, name, room, lang }) => {
    const existingUser = users.find(
      (user) => user.room === room && user.name === name
    );

    if (!name || !room) return { error: "Username and room are required." };
    if (existingUser) return { error: "Username is taken." };

    if (!existingUser) {
      name = name.trim().toLowerCase();
      room = room.trim().toLowerCase();

      const user = { id, name, room, lang };

      users.push(user);
      console.log(users);
      return { user };
    }
  },
  removeUser: (id) => {
    const index = users.find((user) => user.id === id);
    console.log("index", index);

    if (index !== undefined) return users.splice(users.indexOf(index), 1)[0];
  },
  getUser: (id) => {
    return users.find((user) => user.id === id);
  },
  getUsersInRoom: (room) => {
    return users.filter((user) => user.room === room);
  },
  getAllUsers: () => {
    return users;
  },
};
