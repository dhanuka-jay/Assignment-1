using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using CoreWithReact.Models;

namespace CoreWithReact.Controllers
{
    public class ProductController : Controller
    {
        private tempSchemaContext db = new tempSchemaContext();

        public IActionResult Index()
        {
            return View();
        }

        
        [HttpGet]
        public ActionResult GetProduct()
        {
            var findProduct = db.Product.Select(x => new { x.Id, x.Name, x.Price }).ToList();
            return Json(findProduct);
        }

        
        [HttpPost]
        public ActionResult DeleteProduct(int id)
        {
            db.Product.Remove(db.Product.Find(id));
            db.SaveChanges();
            return Json(db.Product.Select(x => new { x.Id, x.Name, x.Price }).ToList());
        }


        [HttpPost]
        public ActionResult CreateProduct(string name, decimal price)
        {
            Product newProduct = new Product
            {
                Name = name,
                Price = price
            };
            db.Product.Add(newProduct);
            db.SaveChanges();
            return Json(db.Product.Select(x => new { x.Id, x.Name, x.Price }).ToList());
        }


        public ActionResult UpdateProduct(int id, string newName, decimal newPrice)
        {
            var thisProduct = db.Product.Find(id);
            thisProduct.Name = newName;
            thisProduct.Price = newPrice;
            db.SaveChanges();
            return Json(db.Product.Select(x => new { x.Id, x.Name, x.Price }).ToList());
        }
    }
}