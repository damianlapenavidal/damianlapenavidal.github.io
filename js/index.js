function validarFormulario() {
    const nombre = document.getElementById("nombre").value;
    if (nombre === "") {
        alert("Por favor, introduce tu nombre.");
        return false; // Evita el envío del formulario
    }
    alert("Formulario enviado con éxito. ¡Gracias!");
    return true;
}
