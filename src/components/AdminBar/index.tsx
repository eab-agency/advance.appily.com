"use client";
"use client";

import type { PayloadAdminBarProps } from "payload-admin-bar";
import type { PayloadAdminBarProps } from "payload-admin-bar";

import { usePathname, useSelectedLayoutSegments } from "next/navigation";
import { PayloadAdminBar, PayloadMeUser } from "payload-admin-bar";
import React from "react";
import { useId } from "../../context/idContext";
import { usePathname, useSelectedLayoutSegments } from "next/navigation";
import { PayloadAdminBar, PayloadMeUser } from "payload-admin-bar";
import React from "react";
import { useId } from "../../context/idContext";

// import { useAuth } from '../../_providers/Auth'
import styles from "./index.module.scss";
import styles from "./index.module.scss";

const Title: React.FC = () => <span>Dashboard</span>;
const Title: React.FC = () => <span>Dashboard</span>;

const collectionLabels = {
  pages: {
    plural: "Pages",
    singular: "Page",
    plural: "Pages",
    singular: "Page",
  },
  posts: {
    plural: "Posts",
    singular: "Post",
  },
};
    plural: "Posts",
    singular: "Post",
  },
};

export const AdminBar: React.FC<{
  adminBarProps?: PayloadAdminBarProps;
  user?: PayloadMeUser;
  setUser?: (user: PayloadMeUser) => void; // eslint-disable-line no-unused-vars
  adminBarProps?: PayloadAdminBarProps;
  user?: PayloadMeUser;
  setUser?: (user: PayloadMeUser) => void; // eslint-disable-line no-unused-vars
}> = (props) => {
  const { adminBarProps, user, setUser } = props || {};
  const segments = useSelectedLayoutSegments();
  let collection = segments?.[1] === "posts" ? "posts" : "pages";
  const { adminBarProps, user, setUser } = props || {};
  const segments = useSelectedLayoutSegments();
  let collection = segments?.[1] === "posts" ? "posts" : "pages";
  const { docId } = useId();

  const pathname = usePathname();
  if (pathname?.includes("/blog/")) {
    collection = "posts";
  if (pathname?.includes("/blog/")) {
    collection = "posts";
  }
  console.log(process.env.NEXT_PUBLIC_CMS_URL, 'NEXT_PUBLIC_CMS_URL');
  console.log(docId, 'docId***');
  console.log(collection, 'collection***')
  return (
    <>
      <PayloadAdminBar
        {...adminBarProps}
        className={styles.adminBar}
        cmsURL={process.env.NEXT_PUBLIC_CMS_URL}
        collection={collection}
        collectionLabels={{
          plural: collectionLabels[collection]?.plural || "Pages",
          singular: collectionLabels[collection]?.singular || "Page",
          plural: collectionLabels[collection]?.plural || "Pages",
          singular: collectionLabels[collection]?.singular || "Page",
        }}
        // @ts-ignore
        id={docId}
        logo={<Title />}
        unstyled={true}
        classNames={{
          logo: styles.logo,
          user: styles.user,
          edit: styles.edit,
          create: styles.create,
          preview: styles.preview,
          logout: styles.logout,
          controls: styles.controls,
        }}
        classNames={{
          logo: styles.logo,
          user: styles.user,
          edit: styles.edit,
          create: styles.create,
          preview: styles.preview,
          logout: styles.logout,
          controls: styles.controls,
        }}
      />
    </>
  );
};
  );
};
