using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using CoreWithReact.Models;

namespace CoreWithReact.Controllers
{
    public class SalesController : Controller
    {
        private tempSchemaContext db = new tempSchemaContext();

        public IActionResult Index()
        {
            return View();
        }

        /// <summary>
        /// Get the list of all Sales from the database.
        /// </summary>
        /// <returns>List of Sales</returns>
        [HttpGet]
        public ActionResult GetSales()
        {
            var allSales = db.Sales.Join(db.Customer, s => s.CustomerId, c => c.Id,
                (s, c) => new { s, c })
                .Join(db.Store, s1 => s1.s.StoreId, st => st.Id,
                (s1, st) => new {s1, st})
                .Join(db.Product, s2 => s2.s1.s.ProductId, p => p.Id,
                (s2, p) => new {
                    ID = s2.s1.s.Id,
                    ProductName = p.Name,
                    CustomerName = s2.s1.c.Name,
                    StoreName = s2.st.Name,
                    DateSold = s2.s1.s.DateSold
                });

            return Json(allSales);
        }

        /// <summary>
        /// Delete selected Sales.
        /// </summary>
        /// <param name="id"> Sales ID </param>
        /// <returns> New list of Sales after deletion. </returns>
        [HttpPost]
        public ActionResult DeleteSales(int id)
        {
            db.Sales.Remove(db.Sales.Find(id));
            db.SaveChanges();
            return Json(db.Sales.Select(x => new { x.Id, x.ProductId, x.CustomerId, x.StoreId, x.DateSold }).ToList());
        }


        [HttpPost]
        public ActionResult CreateSales(int productId, int customerId, int storeId, DateTime dateSold)
        {
            Sales newSales = new Sales
            {
                ProductId = productId,
                CustomerId = customerId,
                StoreId = storeId,
                DateSold = dateSold
            };
            db.Sales.Add(newSales);
            db.SaveChanges();
            return Json(db.Sales.Select(x => new { x.Id, x.ProductId, x.CustomerId, x.StoreId, x.DateSold }).ToList());
        }


        public ActionResult UpdateSales(int id, int productId, int customerId, int storeId, DateTime dateSold)
        {
            var mySales = db.Sales.Find(id);
            mySales.ProductId = productId;
            mySales.CustomerId = customerId;
            mySales.StoreId = storeId;
            mySales.DateSold = dateSold;
            db.SaveChanges();
            return Json(db.Sales.Select(x => new { x.Id, x.ProductId, x.CustomerId, x.StoreId, x.DateSold }).ToList());
        }

        public ActionResult FindSales(int id)
        {
            var mySales = db.Sales.Find(id);
            return Json(mySales);
        }
    }
}