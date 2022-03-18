#nullable disable
using Microsoft.EntityFrameworkCore;
using WebAPIEFDepartment.Models;

namespace WebAPIEFDepartment.Data
{
    public class EvoDBContext : DbContext
    {
        public EvoDBContext(DbContextOptions<EvoDBContext> options)
            : base(options)
        {
        }
        public DbSet<Departamento> Departamentos { get; set; }
        public DbSet<Funcionario> Funcionarios { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Password=ksv123456;Persist Security Info=True;User ID=ksv;Initial Catalog=EvoDB;Data Source=DESKTOP-6FU40B9");
        }
    }
}
