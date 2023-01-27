const modal = document.querySelector('#modal_horario');
const horario_nombre_materia = document.querySelector('#buscador_input');
function openModalHorario(){
    const input_dia= document.querySelector('#dia_horario_input');
    const input_hora= document.querySelector('#hora_horario_input');
    horario_nombre_materia.value="";
    modal.showModal();
};
function cerrarModalHorario(){
    modal.close();
};
function agregarMateriaHorario(){
    console.log("llega");
}
function habilitar(input){
    input.classList.remove('input_bloqueado');
    input.requiered = true;
    input.disabled= false;
} 
function bloquear(input){
    input.classList.add('input_bloqueado');
    input.disabled = true;
    input.requiered = false;
    input.value="";
}
horario_nombre_materia.addEventListener('focus',()=>{
    horario_nombre_materia.value;
    const url = 'http://127.0.0.1:5500/solicitando_materias_de_usuario';
    const data = {
        id:'1',
        
    }
//     const url = 'https://jsonplaceholder.typicode.com/users';
// const data = {
//     name: 'John Doe',
//     email: 'johndoe@example.com'
// };
// const options = {
//     method: 'POST',
//     body: JSON.stringify(data),
//     headers: {
//         'Content-Type': 'application/json'
//     }
// };
// fetch(url, options)
//     .then(response => response.json())
//     .then(data => {
//         console.log(data);
//     })
//     .catch(error => console.error(error));

});
horario_nombre_materia.addEventListener('blur',()=>{
    const input_dia= document.querySelector('#dia_horario_input');
    const input_hora= document.querySelector('#hora_horario_input');
    const btn_enviar = document.querySelector('#btn_enviar_horario');
    if(horario_nombre_materia.value == ''){
        bloquear(input_dia);
        bloquear(input_hora);
    }
    if(!(horario_nombre_materia.value=='fisica'))
        return
    if(horario_nombre_materia.value == 'fisica'){
        habilitar(input_dia);
        habilitar(input_hora);
        btn_enviar.addEventListener('submit',()=>{
            horario_nombre_materia.value ='';
            bloquear(input_dia);
            bloquear(input_hora);
        });
        
    }else{
        bloquear(input_dia);
        bloquear(input_hora);
    }
})