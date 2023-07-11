function criarTabela() {
   let colunaCount = 0;
   const url = 'http://localhost:3000/pegar/usuario'
   fetch(url, {
      method: 'GET',
      headers: {
         'Content-Type': 'application/json'
      },
   })
      .then(response => response.json())
      .then(data => {
         const tabelaUsuarios = document.getElementById('tabelaUsuarios')
         let dados = data;
         dados.forEach(Usuarios => {
            const linha = document.createElement('tr')
            const Coluna = document.createElement('tr')

            if (colunaCount <= 0) {

               Coluna.innerHTML = `
            
            <th>Nome</th>
            <th>Senha</th>
            <th>ADM</th>
            <th>Ações</th> `

               colunaCount++

            }

            linha.innerHTML = `
              <td>${Usuarios.nome}</td>
              <td>${Usuarios.senha}</td>
              <td>${Usuarios.adm ? 'sim' : 'não'}</td>
              <td><button onclick="criarTabela()">Editar</button></td> <button class="btn btn-danger" onclick="excluirUser(${Usuarios.id})">Excluir</button>`
              

            tabelaUsuarios.appendChild(Coluna)
            tabelaUsuarios.appendChild(linha)
         })

      })
}


function excluirUser(id) {

   const url = 'http://localhost:3000/deletar/usuario/' + id
   fetch(url, {
      method: 'DELETE',
      headers: {
         'Content-Type': 'application/json'
      },
      .then(response => response.json())
      .then(data => {
      $("#tabelaUsuarios").remove();
      $("#dy").remove();
         criarTabelaAposEventos();
})
}