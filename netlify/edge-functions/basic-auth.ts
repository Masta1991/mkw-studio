export default async (request: Request, context: any) => {
  // Hasło dostępu do strony MKW Studio
  const expectedPass = "mkw2026";
  const expectedUser = "mkw";

  const authHeader = request.headers.get("authorization");
  
  // Obsługa dowolnego loginu, o ile hasło to mkw2026
  if (authHeader && authHeader.startsWith("Basic ")) {
    try {
      const decoded = atob(authHeader.replace("Basic ", ""));
      const [, pass] = decoded.split(":");
      if (pass === expectedPass) {
        return context.next();
      }
    } catch {
      // Ignoruj błąd parsowania
    }
  }

  return new Response("Wymagana autoryzacja. Podaj hasło dostępu.", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Dostęp do projektu MKW Studio (hasło: mkw2026)"',
      "Content-Type": "text/plain; charset=utf-8"
    },
  });
};
