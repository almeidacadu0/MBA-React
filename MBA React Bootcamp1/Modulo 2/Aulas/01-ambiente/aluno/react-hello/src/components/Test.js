export default function Test(props) {
  console.log(props);

  return <div>Test</div>;
}

//Exemplo de utilização de props

/*{ <Test
number={10}
string="Teste"
visible
data={{ a: 1, b: 2 }}
onClick={() => {
  console.log('click');
}}
/> }*/
