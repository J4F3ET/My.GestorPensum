const modal = document.querySelector('#modal_horario');
function openModalHorario(){
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
    input.attributes.removeNamedItem('disabled');
} 
function bloquear(input){
    input.classList.add('input_bloqueado');
    input.attributes.addNamedItem('disabled');
}
const horario_nombre_materia = document.querySelector('#buscador_input');
horario_nombre_materia.addEventListener('input',()=>{
    if(!(horario_nombre_materia.value=='fisica'))
        return

    const input_dia= document.querySelector('#dia_horario_input');
    const input_hora= document.querySelector('#hora_horario_input');
    habilitar(input_dia);
    habilitar(input_hora);
    const btn_enviar = document.querySelector('#btn_enviar_horario');
    if(horario_nombre_materia.value == 'fisica'){
        btn_enviar.addEventListener('submit',agregarMateriaHorario());
        input_dia.value="";
        input_hora.value="";
        bloquear(input_dia);
        bloquear(input_hora);
        
    }else{
        input_dia.value="";
        input_hora.value="";
        bloquear(input_dia);
        bloquear(input_hora);
    }
});