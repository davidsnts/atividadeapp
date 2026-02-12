using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProAtividade.API.Models;

namespace ProAtividade.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AtividadeController : ControllerBase
    {
        public IList<Atividade> Atividades = new List<Atividade>()
        {
            new Atividade(1),
            new Atividade(2),
            new Atividade(3),
        };

        [HttpGet]
        public IList<Atividade> Get()
        {

            return Atividades;
        }

        [HttpGet("{id}")]
        public Atividade Get(int id)
        {
            var atividade = Atividades.FirstOrDefault(x => x.Id == id);
            return atividade;
        }

        [HttpPost]
        public IList<Atividade> Post(Atividade atividade)
        {
            Atividades.Add(atividade);
            return Atividades; 
        }

        [HttpPut("{id}")]
        public Atividade Put(int id, Atividade atividade)
        {
            atividade.Id = atividade.Id + 1;
            return atividade;
        }

        [HttpDelete("{id}")]
        public string Delete(int id)
        {
            return "My first method Delete";
        }
    }
}
