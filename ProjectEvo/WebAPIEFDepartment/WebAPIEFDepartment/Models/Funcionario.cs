#nullable disable
using System.ComponentModel.DataAnnotations;

namespace WebAPIEFDepartment.Models
{
    public class Funcionario
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Insira o nome")]
        [MaxLength(50)]
        public string Nome { get; set; }

        [Required(ErrorMessage = "Insira uma foto válida")]
        public string Foto { get; set; }

        [Required(ErrorMessage = "Insira um RG válido")]
        [MaxLength(45)]
        public string RG { get; set; }

        [Required(ErrorMessage = "Escolha um departamento")]
        public int DepartamentoId { get; set; }
    }
}
