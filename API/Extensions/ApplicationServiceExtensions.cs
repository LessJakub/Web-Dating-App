using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Interfaces;
using API.Services;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions
{
    //Static means that we do not need to create an instance of this class in order to use it.
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
        {
            //Services:
            //Singleton - starts once and works to the end
            //Scoped - Scoped to the lifetime of http request
            //Transient - Service is created and destroyed in the same method
            //Interface is not required fo this, only reason for this is that interfaces are a good practice and are useful in tests.
            services.AddScoped<ITokenService, TokenService>();
            services.AddDbContext<DataContext>(options => 
            {
                options.UseSqlite(config.GetConnectionString("DefaultConnection"));
            });

            return services;
        }
    }
}