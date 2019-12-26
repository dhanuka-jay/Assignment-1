using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using CoreWithReact.Models;

namespace CoreWithReact.Controllers
{
    public class CustomerController : Controller
    {
        private tempSchemaContext db = new tempSchemaContext();

        public IActionResult Index()
        {
            return View();
        }

        /// <summary>
        /// Get the list of all Cutomers from the database.
        /// </summary>
        /// <returns>List of Customers</returns>
        [HttpGet]
        public ActionResult GetCustomer()
        {
            var findCustomer = db.Customer.Select(x => new { x.Id, x.Name, x.Address }).ToList();
            return Json(findCustomer);
        }

        /// <summary>
        /// Delete selected Customer.
        /// </summary>
        /// <param name="id"> Customer ID </param>
        /// <returns> New list of Customers after deletion. </returns>
        [HttpPost]
        public ActionResult DeleteCustomer(int id)
        {
            db.Customer.Remove(db.Customer.Find(id));
            db.SaveChanges();
            return Json(db.Customer.Select(x => new { x.Id, x.Name, x.Address }).ToList());
        }

        /// <summary>
        /// Create new Customer.
        /// </summary>
        /// <param name="name"></param>
        /// <param name="address"></param>
        /// <returns> List of Customers including newly created.</returns>
        [HttpPost]
        public ActionResult CreateCustomer(string name, string address)
        {
            Customer newCustomer = new Customer
            {
                Name = name,
                Address = address
            };
            db.Customer.Add(newCustomer);
            db.SaveChanges();
            return Json(db.Customer.Select(x => new { x.Id, x.Name, x.Address }).ToList());
        }

        /// <summary>
        /// Update and existing customer.
        /// </summary>
        /// <param name="id">key value.</param>
        /// <param name="newName"> New Name of the customer.</param>
        /// <param name="newAddress">New Address of the customer.</param>
        /// <returns> List of customers with the updates.</returns>
        public ActionResult UpdateCustomer(int id, string newName, string newAddress)
        {
            var myCustomer = db.Customer.Find(id);
            myCustomer.Name = newName;
            myCustomer.Address = newAddress;
            db.SaveChanges();
            return Json(db.Customer.Select(x => new { x.Id, x.Name, x.Address }).ToList());
        }
    }
}