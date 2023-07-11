const express = require("express")
const cors = require("cors")
const app = express()
 


const pool = require('./bd');

app.use(express.json());
app.use(cors())



app.get("/pegar/usuario", async function (req, res) {
    try {
        // Consultar dados da tabela usuario
        const [rows, fields] = await pool.query('SELECT * FROM usuario');

        return res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao obter os usuários.' });
    }
})

app.get("/pegar/materias", async function (req, res) {
    try {
        // Consultar dados da tabela usuario
        const [rows, fields] = await pool.query('SELECT * FROM materias');

        return res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao obter os materias.' });
    }
})

app.get("/pegar/curso", async function (req, res) {
    try {
        // Consultar dados da tabela usuario
        const [rows, fields] = await pool.query('SELECT * FROM curso');

        return res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao obter os curso.' });
    }
})

app.get("/pegar/professor", async function (req, res) {
    try {
        // Consultar dados da tabela usuario
        const [rows, fields] = await pool.query('SELECT * FROM  professor');

        return res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao obter os professor.' });
    }
})

app.get("/pegar/aluno", async function (req, res) {
    try {
        // Consultar dados da tabela usuario
        const [rows, fields] = await pool.query('SELECT * FROM aluno');

        return res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao obter os aluno.' });
    }
})


app.post('/criar/usuario', async (req, res) => {
    const { nome, senha, adm } = req.body;
    // console.log(req.body)
    if (!nome || !senha) {
        return res.status(400).json({ message: 'Preencha todos os campos.' });
    }

    if (typeof adm != "boolean") {
        return res.status(400).json({ message: 'Campo adm precisa ser booleano' });
    }

    try {
        // Verifica se o nome já está em uso
        const [rows, fields] = await pool.query('SELECT * FROM usuario WHERE nome = ?', [nome]);
        if (rows.length > 0) {
            return res.status(400).json({ message: 'Este nome já está em uso.' });
        }

        // Insere o novo usuário no banco de dados
        await pool.query('INSERT INTO usuario (nome, senha, adm) VALUES (?, ?, ?)', [nome, senha, adm]);

        return res.status(201).json({ message: 'Usuário registrado com sucesso.' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao registrar usuário.' });
    }



});

app.post('/logar/usuario', async (req, res) => {
    const { nome, senha, adm } = req.body;
    // console.log(req.body)
    if (!nome || !senha || !adm) {
        return res.status(400).json({ message: 'Preencha todos os campos.' });
    }

    try {
        // Verifica se o nome já está em uso
        const [rows, fields] = await pool.query('SELECT * FROM usuario WHERE nome = ? AND senha = ?', [nome, senha]);
        if (rows.length > 0) {
            // console.log(rows[0].adm);
            if (rows[0].adm === 1) {
                return res.status(200).json({ adm: true });
            } else {
                return res.status(200).json({ adm: false });
            }

        }


        return res.status(400).json({ message: 'Nome ou senha invalido' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao logar usuário.' });
    }



});

app.put("/atualizar/usuario/:id", async (req, res) => {
    const { id } = req.params
    var { nome, senha, adm } = req.body;


    if (!nome || !senha || !adm) {
        return res.status(400).json({ message: 'Preencha todos os campos.' });
    }

    try {
        // Verifica se o registro existe
        const [rows] = await pool.query('SELECT * FROM usuario WHERE id = ?', [id]);
        if (rows.length <= 0) {
            console.log(rows)
            return res.status(404).json({ message: 'Este registro não existe' });
        }

        // console.log(rows)

        //Atualizar o usuário no banco de dados
        await pool.query('UPDATE usuario set nome = ?, senha = ? WHERE id = ?', [nome, senha, id]);

        res.status(200).json({ message: "Usuário atualizado com sucesso" });

        // return res.status(201).json({ message: 'Usuário registrado com sucesso.' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao atualizar usuário.' });
    }
})

app.delete("/deletar/usuario/:id", async (req, res) => {
    const { id } = req.params


    if (!id) {
        return res.status(400).json({ message: 'Envie o ID !.' });
    }


    try {
        // Verifica se o registro existe
        const [rows] = await pool.query('SELECT * FROM usuario WHERE id = ?', [id]);
        if (rows.length <= 0) {
            console.log(rows)
            return res.status(404).json({ message: 'Este registro não existe' });
        }

        // console.log(rows)

        //Delete o usuário no banco de dados
        await pool.query('DELETE FROM usuario WHERE id = ?', [id]);

        res.status(200).json({ message: "Usuário deletado com sucesso" });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao deletar usuário.' });
    }
})



app.listen(3000, function () {
    console.log("Servidor rodando na porta 3000")
})