import { Feature, toggleFeature } from "~/models/manage.server";
import { redirect, type LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";

export const loader = async ({ request }: LoaderArgs) => {
  const features: Feature[] = await toggleFeature();
  return { features };
};

export default function SelectFeature() {
  const { features } = useLoaderData<typeof loader>();
  const form = useForm();

  return (
    <form method="get">
      <div className="items-top flex-box">
        <div className="items-top flex space-x-2">
          <input type="checkbox" name={features[0].featureName} id={features[0].featureName} />
          <div className="grid gap-1.5 leading-none">
            <label
              htmlFor="terms1"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Add a Study Room
            </label>
          </div>
        </div>
        <div className="items-top flex space-x-2">
          <input type="checkbox" name={features[1].featureName} id={features[1].featureName} />
          <div className="grid gap-1.5 leading-none">
            <label
              htmlFor="terms1"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {features[1].featureName}
            </label>
          </div>
        </div>
        <Button type="submit">Select</Button>
      </div>
    </form>
  );
}
