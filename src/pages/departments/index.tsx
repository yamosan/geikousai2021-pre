import { GetStaticProps } from "next";
import { useMemo } from "react";
import { getDepartments, EXECUTIVE_ID } from "utils/departments";
import Layout from "components/layouts";
import FirstView from "components/parts/FirstView";
import TekibusyoLink from "components/TekibusyoLink";
import QAndAPageLink from "components/QAndAPageLink";
import Section from "components/Section";
import PictureFrameList from "components/PictureFrameList";
import LinkButton from "components/parts/LinkButton";
import type { NextPage } from "next";
import type { Department } from "models/department";

type Props = {
  items: Department[];
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const items = await getDepartments();
  return { props: { items } };
};

const Departments: NextPage<Props> = ({ items }) => {
  const [executive, departments] = useMemo(() => {
    return items.reduce(
      ([pass, fail], item) => {
        return EXECUTIVE_ID.includes(item.id) ? [[...pass, item], fail] : [pass, [...fail, item]];
      },
      [[], []]
    ) as [Department[], Department[]];
  }, [items]);

  return (
    <Layout title="Departments | Next.js + TypeScript Example">
      <FirstView index="01" title="部署紹介" />
      <div className="w-5/6 mx-auto pt-8">
        <p className="text-black text-sm font-medium leading-6">
          芸工祭には全部で19の部署長と幹部が居ます。
          <br />
          <span className="highlight">気になる部署</span>に所属して、みんなで芸工祭を盛り上げよう！
        </p>
        <div className="flex flex-col gap-3 pt-6">
          <TekibusyoLink />
          <QAndAPageLink />
        </div>
        <Section heading="幹部" className="pt-12">
          <PictureFrameList departments={executive} />
        </Section>
        <Section heading="部署" className="pt-12">
          <PictureFrameList departments={departments} />
        </Section>
        <div className="py-10">
          <LinkButton href="#">部署配属希望フォームはコチラ</LinkButton>
        </div>
      </div>
    </Layout>
  );
};

export default Departments;
