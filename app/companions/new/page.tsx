import CompanionForm from "@/components/CompanionForm";
import { newCompanionPermissions } from "@/lib/actions/companion.action";
import { auth } from "@clerk/nextjs/server";
import { Link } from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";

import React from "react";

const NewCompanion = async () => {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");
  const cancreateCompanion = await newCompanionPermissions();
  return (
    <main className="min-lg:w-1/3 min-md:w-2/3 items-center justify-center">
      {cancreateCompanion ? (
        <article className="w-full gap-4 flex flex-col">
          <h1>Companion Builder</h1>
          <CompanionForm />
        </article>
      ) : (
        <article className="companion-limit">
          <Image
            src="/images/limit.svg"
            alt="Companion limit reached"
            width={360}
            height={230}
          />
          <div className="cta-badge">Upgrade your plan</div>
          <h1>You have reached the companion limit</h1>
          <p>
            Youre reached your companion limit.Upgrade to create more companions
            and premium features
          </p>
          <Link
            href="/subscription"
            className="bt-primary w-full justify-center"
          >
            Upgrade your Plan
          </Link>
        </article>
      )}
    </main>
  );
};

export default NewCompanion;
