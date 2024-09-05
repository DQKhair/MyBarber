using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyBarBer.Data;

namespace MyBarBer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RolesUserController : ControllerBase
    {
        private readonly MyDBContext _context;

        public RolesUserController(MyDBContext context)
        {
            _context = context;
        }

        // GET: api/RolesUser
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RolesUser>>> GetRolesUser()
        {
            return await _context.RolesUser.ToListAsync();
        }

        // GET: api/RolesUser/5
        [HttpGet("{id}")]
        public async Task<ActionResult<RolesUser>> GetRolesUser(Guid id)
        {
            var rolesUser = await _context.RolesUser.FindAsync(id);

            if (rolesUser == null)
            {
                return NotFound();
            }

            return rolesUser;
        }

        // PUT: api/RolesUser/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRolesUser(Guid id, RolesUser rolesUser)
        {
            if (id != rolesUser.Role_ID)
            {
                return BadRequest();
            }

            _context.Entry(rolesUser).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RolesUserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/RolesUser
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<RolesUser>> PostRolesUser(RolesUser rolesUser)
        {
            var _roleUser = new RolesUser
            {
                Role_ID = Guid.NewGuid(),
                RoleName = rolesUser.RoleName
            };
            _context.RolesUser.Add(_roleUser);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRolesUser", new { id = rolesUser.Role_ID }, rolesUser);
        }

        // DELETE: api/RolesUser/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRolesUser(Guid id)
        {
            var rolesUser = await _context.RolesUser.FindAsync(id);
            if (rolesUser == null)
            {
                return NotFound();
            }

            _context.RolesUser.Remove(rolesUser);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool RolesUserExists(Guid id)
        {
            return _context.RolesUser.Any(e => e.Role_ID == id);
        }
    }
}
