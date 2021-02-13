import checkUser from "../api/checkUser";

const correctUser = {
  email: "JeronimCzerwinski@armyspy.com",
  pass: "Czerwinski123",
};
const incorrectUser = { email: "ijwij@gmail.com", pass: "blabla" };
const incorrectPassword = {
  email: "JeronimCzerwinski@armyspy.com",
  pass: "error",
};

test("Loguje z poprawnymi danami", () => {
  return checkUser(correctUser).then(() => {
    expect(sessionStorage.getItem("name")).toBe("Jeronim Czerwinski");
  });
});

test("Loguje z błędnymi danami", () => {
  return checkUser(incorrectUser).then((data) => {
    expect(data).toBe(undefined);
  });
});

test("Loguje z błędnym hasłem", () => {
  return checkUser(incorrectPassword).then((data) => {
    expect(data).toBe("Złe hasło!");
  });
});
