/* eslint-env browser, node */

import { Mast } from "./Mast";
import { Footer } from "./Footer";

export function Layout({
  currentPath,
  children,
}: {
  currentPath: string;
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div>
      <a
        href="#content"
        className="bg-subtle text-accent translate-skip-to-content absolute left-1/2 top-0.5 z-50 mx-auto px-6 py-2 text-center"
      >
        Skip to content
      </a>
      <div
        className={
          "image-filter bg-notcomingsoon max-w-canvas desktop:sticky desktop:top-0 desktop:z-40 mx-auto min-h-4 w-full"
        }
      />

      <div className="max-w-canvas bg-default mx-auto flex min-h-full flex-col">
        <Mast currentPath={currentPath} />
        <div className="grow" id="content">
          {children}
        </div>
        <Footer currentPath={currentPath} />
      </div>
    </div>
  );
}
