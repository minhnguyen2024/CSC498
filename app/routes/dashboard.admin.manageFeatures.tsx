import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/table";

import { type LoaderArgs, type ActionArgs } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";

import { toggleFeature } from "~/models/manage.server";
import { requireUserId } from "~/session.server";

export const loader = async ({ request }: LoaderArgs) => {
  const userId = await requireUserId(request);
  const features = await toggleFeature();
  return features;
};

export const action = async ({ request }: ActionArgs) => {
  return null;
};
type Feature = {
  id: number;
  featureName: string;
  enabled: number;
};
export default function ManageFeatures() {
  const features: Feature[] = useLoaderData<typeof loader>();

  return (
    <div>
      <p>Feature Flags</p>
      <Form method="post">
        <Table>
          <TableBody>
            <TableRow>
              <TableHead>Feature Name</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
            {features.map((feature: Feature) => (
              <TableRow key={feature.id}>
                <TableCell>{feature.featureName}</TableCell>
                <TableCell></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Button>Save</Button>
      </Form>
      
    </div>
  );
}
