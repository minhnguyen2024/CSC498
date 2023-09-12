import { Button } from "@/components/ui/button";
import { type ActionArgs, type LoaderArgs } from "@remix-run/node";
import { Form } from "@remix-run/react";

export const loader = async ({ request }: LoaderArgs) => {
  return null;
};

export const action = async ({ request }: ActionArgs) => {
  return null;
};

export default function CafeRoyOrder() {
  return (
    <div>
      <div className="flex-box">
        <Form method="get">
          <div className="flex">
            <label>Iced</label>
            <input type="radio" name="condition" value="iced" />
          </div>
          <div className="flex">
            <label>Hot</label>
            <input type="radio" name="condition" value="hot" />
          </div>
          <div className="flex">
            <label>Whipped Cream</label>
            <input type="radio" name="whippedCream" value="on" />
          </div>
          
          <Button type="submit">Continue</Button>
        </Form>
      </div>
    </div>
  );
}
