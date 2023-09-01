export const consultas = {

    crearUsuario: "INSERT INTO [app].[dbo].[usuarios] (nombres, apellidos, cedula, email, pass) OUTPUT INSERTED.id VALUES (@nombres, @apellidos, @cedula, @email, @pass);",

    login: "SELECT * FROM [app].[dbo].[usuarios] WHERE email = @email",

}