#nullable disable
using System.ComponentModel.DataAnnotations;

namespace WebAPIEFDepartment.Models
{
    public class Departamento
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Insira o nome")]
        [MaxLength(50)]
        public string Nome { get; set; }

        [Required(ErrorMessage = "Insira a sigla")]
        [MaxLength(10)]
        public string Sigla { get; set; }
        public List<Funcionario> Funcionarios { get; set; }
    }
}
