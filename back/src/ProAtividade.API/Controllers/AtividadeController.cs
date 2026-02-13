using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProAtividade.API.Data;
using ProAtividade.API.Models;

namespace ProAtividade.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AtividadeController : ControllerBase
    {
        public readonly DataContext _context;

        public AtividadeController(DataContext context)
        {
            _context = context;
        }
        [HttpGet]
        public IEnumerable<Atividade> Get()
        {

            return _context.Atividades;
        }

        [HttpGet("{id}")]
        public Atividade Get(int id)
        {
            return _context.Atividades.FirstOrDefault(x => x.Id == id);            
        }

        [HttpPost]
        public IEnumerable<Atividade> Post(Atividade atividade)
        {
            _context.Atividades.Add(atividade);
            if (_context.SaveChanges() > 0) {
                return _context.Atividades;
            }
            else
            {
                throw new Exception("Você não conseguiu adicionar uma ativadade");
            }
            
        }

        [HttpPut("{id}")]
        public Atividade Put(int id, Atividade atividade)
        {
            if (atividade.Id != id)
            {
                throw new Exception("Você está tentando editar a atividade errada");
            }

            _context.Update(atividade);

            if (_context.SaveChanges() > 0)
            {
                return _context.Atividades.FirstOrDefault(x => x.Id == id);
            }
            else
            {
                throw new Exception("Você não conseguiu editar a ativadade");
            }
        }

        [HttpDelete("{id}")]
        public bool Delete(int id)
        {
            var atividade = _context.Atividades.FirstOrDefault(x => x.Id == id);

            if (atividade?.Id != id)
            {
                throw new Exception("Você está tentando deletar uma atividade que não existe");
            }

            _context.Remove(atividade);           
            return _context.SaveChanges() > 0;         
        }
    }
}
