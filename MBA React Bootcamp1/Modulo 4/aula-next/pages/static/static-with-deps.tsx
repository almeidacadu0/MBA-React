export async function getStaticProps() {
  return {
    props: {
      propTest: 'This is a test',
    },
  };
}

const Static = ({ propTest }: { propTest: string }) => {
  return <div>Static component {propTest}</div>;
};

export default Static;
