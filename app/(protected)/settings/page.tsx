import { auth, signOut } from "@/auth";

const SettingsPage = async () => {
  const session = await auth();

  return (
    <>
      <div>Settings Page</div>
      <div>{JSON.stringify(session)}</div>
      <div>
        <form
          action={async () => {
            // Doc: https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations#server-components
            "use server";

            await signOut();
          }}
        >
          <button type="submit">Sign Out</button>
        </form>
      </div>
    </>
  );
};

export default SettingsPage;
