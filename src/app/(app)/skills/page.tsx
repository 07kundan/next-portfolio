import { skillSchema } from "@/app/interfaces/skillsInterface";
import SkillList from "@/components/skill/skillList";
import { client } from "@/sanity/client";

export default async function Page() {
  // Fetch data at build time
  const data: skillSchema = await client.fetch('*[_type == "skills"][0]');
  console.log(data);

  return <SkillList data={data} />;
}
