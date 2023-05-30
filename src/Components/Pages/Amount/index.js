import './Amount.css'

const Amount = () => {
  return (
    <section className="AmountPage">
      <form>
        <h1>
          Inserir Estoque
        </h1>
        <div className='formSelect'>
          <label htmlFor="product">Produto</label>
          <select name="product">
            <option> SSSSS </option>
            <option> aaaaa </option>
            <option> BBBB </option>
          </select>
        </div>
          <label htmlFor="qtd">Quantidade</label>
          <input type="text" name="qtd" />
        <button>Enviar</button>
      </form>
    </section>
  )
}

export default Amount