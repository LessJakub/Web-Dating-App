using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTO
{
    public class RegisterDTO
    {
        //Data annotation
        //We can use other annotations for authomatic checks
        [Required]
        public string Username { get; set; }

        [Required]
        public string Password { get; set; }
    }
}