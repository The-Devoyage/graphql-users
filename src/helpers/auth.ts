export const checkAuth = (options: { context: any; requireUser?: boolean }) => {
  const { context, requireUser } = options;

  if (!context.isAuth) throw new Error("Not Authenticated");

  if (requireUser) {
    if (!("user" in context.token)) {
      throw new Error("Requires User Authentiction");
    }
  }
};

export const limitRole = (
  userRole: number = 100,
  limit: number,
  error?: string
) => {
  if (userRole !== 1) {
    if (userRole > limit)
      throw new Error(
        `Permission denied. ${
          error ?? "You are not authorized to view/edit these details."
        }`
      );
  }
};
