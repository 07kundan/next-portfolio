"use client";

import { Skills } from "@/app/interfaces/skillsInterface";
import { client } from "@/sanity/client";
import React, { useEffect, useState } from "react";

// function page({ data }: { data: Skills }) {
//   // const [skills, setSkills] = useState<Skills>(data);
//   const [skills, setSkills] = useState<Skills>();

//   useEffect(() => {
//     const fetchData = async () => {
//       const data = await client.fetch('*[_type == ""]');
//       if (data) {
//         setSkills(data[0]);
//       }
//     };
//     fetchData();
//   }, []);

//   return <div>{skills?.skills.map((skill) => skill.name)}</div>;
// }

// export default page;

// at build time

// export async function getStaticProps() {
//   // Call an external API endpoint to get posts
//   const res = await fetch("https://.../posts");
//   const data = await res.json();

//   // By returning { props: { posts } }, the Blog component
//   // will receive `posts` as a prop at build time
//   return {
//     props: {
//       data,
//     },
//   };
// }

function page() {
  return <div>page</div>;
}

export default page;
