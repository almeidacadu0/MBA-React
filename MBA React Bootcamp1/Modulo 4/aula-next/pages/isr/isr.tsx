export async function getStaticProps() {
  const date = new Date();
  return {
    props: {
      propTest: 'This is a test',
      lastRenderer: date.getSeconds(),
    },
    revalidate: 5,
  };
}

const Isr = ({
  propTest,
  lastRenderer,
}: {
  propTest: string;
  lastRenderer: any;
}) => {
  return <div>Static component {lastRenderer}</div>;
};

export default Isr;
