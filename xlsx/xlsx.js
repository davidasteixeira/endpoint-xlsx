require('dotenv').config()
const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');

async function createXLSX (dados,nome){

    const worksheet = await xlsx.utils.json_to_sheet(dados);
    const workbook = await xlsx.utils.book_new();

    await xlsx.utils.book_append_sheet(workbook, worksheet, 'registros');

    await xlsx.writeFile(workbook, path.join(process.env.paste_save,`${nome}.xlsx`));
};

async function generateNameXLSX(){
    let dataString = `${new Date().toLocaleDateString()}${new Date().toLocaleTimeString()}`
    let nameGenerate = `${process.env.name_archive}${dataString.replace(/[\/,\:,\s]/gi,'')}`

    return nameGenerate;
}

async function removeArchive(nome){
    fs.rm(`${process.env.paste_save}${nome}.xlsx`, { force:true }, (err) => {
        if(err){
            console.error(err.message, 'Erro ao localizar o arquivo.');
        }
        console.log("Arquivo deletado com sucesso");
    });
}

module.exports = {createXLSX,removeArchive,generateNameXLSX};