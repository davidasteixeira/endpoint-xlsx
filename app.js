require('dotenv').config()
const express = require('express')
const {generateNameXLSX, createXLSX,removeArchive} = require('./xlsx/xlsx.js');
const path = require('path');

const app = express();
const apiDados = [
    {
        nome: 'David',
        createdAt: '2022-12-12',
    },
    {
        nome: 'Renan',
        createdAt: '2022-12-15',
    },
    {
        nome: 'Pedro',
        createdAt: '2022-12-15',
    },
    {
        nome: 'Gustavo',
        createdAt: '2022-12-15',
    },
];

app.get('/', (req, res) => {
    res.send('Servidor rodando!');
});


app.get('/download', async (req, res, next) => {

    const nameGenerated = await generateNameXLSX();

    await createXLSX(apiDados,nameGenerated);

    res.setHeader("Content-Type","application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    res.setHeader("Content-Dispositon","attachment; filename=" + nameGenerated);

    
    /* 1º MÉTODO - SALVA CONFORME O NOME DO EDPOINT

    const options = {
        root: process.env.paste_save
    }
    
    res.sendFile(`${nameGenerated}.xlsx`, options, async function (err) {
        if (err) {
            console.log(err,'Erro no envio do arquivo');
            return res.status(404).send('Erro no envio do arquivo');
        } else {
            console.log('Arquivo enviado:', nameGenerated);
            await removeArchive(nameGenerated);
        }
    });
    */

    // 2º MÉTODO - SALVO CONFORME O NOME DO ARQUIVO GERADO

   let pathFile = path.join(process.env.paste_save,`${nameGenerated}.xlsx`);

   res.download(pathFile,`${nameGenerated}.xlsx`, async (err)=>{
        if (err) {
            console.log(err,'Erro no envio do arquivo');
            return res.status(404).send('Erro no envio do arquivo');
        } else {
            console.log('Arquivo enviado:', nameGenerated);
            await removeArchive(nameGenerated);
        }
   });
});

app.listen(process.env.port, () => {
    console.log(`Servidor rodando. http://localhost:${process.env.port}`);
});