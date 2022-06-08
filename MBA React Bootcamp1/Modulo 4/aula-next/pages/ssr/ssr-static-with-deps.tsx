export async function getServerSideProps() {
  return {
    props: {
      propTest: 'This is a test',
    },
  };
}

const Ssr = ({ propTest }: { propTest: string }) => {
  return <div>Static component {propTest}</div>;
};

export default Ssr;
