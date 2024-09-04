import { skillSchema } from "@/app/interfaces/skillsInterface";
import SkillList from "@/components/skillList";
import { client } from "@/sanity/client";

export default async function Page() {
  const data: skillSchema = await client.fetch('*[_type == "skills"][0]');

  return <SkillList data={data} />;
}
