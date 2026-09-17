import { useState, useEffect } from "react";
import { fetchGoldRate, fetchLatestRates } from "../services/goldRateService";

export function useProductDetailPrice(product) {
  const [breakdown, setBreakdown] = useState(null);
  const [loading, setLoading] = useState(true);
  const [goldRate, setGoldRate] = useState(null);

  useEffect(() => {
    if (!product) return;
    let cancelled = false;
    async function compute() {
      setLoading(true);
      try {
        let ratePerGram = 0;
        let rateLabel = "";
        
        const metalType = (product.metalType || "").toLowerCase();
        const purity = (product.purity || "").toLowerCase();
        
        const rates = await fetchLatestRates();
        
        if (metalType.includes("gold")) {
          if (purity.includes("24") || metalType.includes("24")) {
            ratePerGram = rates.goldCalculated?.k24 || 14631.9;
            rateLabel = `₹${ratePerGram.toLocaleString("en-IN")}/g (24KT)`;
          } else if (purity.includes("20") || metalType.includes("20")) {
            ratePerGram = rates.goldCalculated?.k20 || 12290.8;
            rateLabel = `₹${ratePerGram.toLocaleString("en-IN")}/g (20KT)`;
          } else if (purity.includes("18") || metalType.includes("18")) {
            ratePerGram = rates.goldCalculated?.k18 || 11120.24;
            rateLabel = `₹${ratePerGram.toLocaleString("en-IN")}/g (18KT)`;
          } else if (purity.includes("14") || metalType.includes("14")) {
            ratePerGram = rates.goldCalculated?.k14 || 8486.5;
            rateLabel = `₹${ratePerGram.toLocaleString("en-IN")}/g (14KT)`;
          } else if (purity.includes("22") || metalType.includes("22")) {
            ratePerGram = rates.goldCalculated?.k22 || 13022.39;
            rateLabel = `₹${ratePerGram.toLocaleString("en-IN")}/g (22KT)`;
          } else {
            ratePerGram = rates.goldCalculated?.k22 || 13022.39;
            rateLabel = `₹${ratePerGram.toLocaleString("en-IN")}/g (22KT)`;
          }
        } else if (metalType.includes("silver")) {
          if (purity.includes("999")) {
            ratePerGram = (rates.silverCalculated?.s999 || 226998) / 1000;
            rateLabel = `₹${ratePerGram.toLocaleString("en-IN")}/g (Silver 999)`;
          } else if (purity.includes("925")) {
            ratePerGram = (rates.silverCalculated?.s925 || 209973.15) / 1000;
            rateLabel = `₹${ratePerGram.toLocaleString("en-IN")}/g (Silver 925)`;
          } else {
            ratePerGram = (rates.silverCalculated?.ordinary || 181598.4) / 1000;
            rateLabel = `₹${ratePerGram.toLocaleString("en-IN")}/g (Silver)`;
          }
        } else if (metalType.includes("platinum")) {
          ratePerGram = 3400;
          rateLabel = `₹${ratePerGram.toLocaleString("en-IN")}/g (Platinum)`;
        } else {
          if (purity.includes("24k")) ratePerGram = rates.goldCalculated?.k24 || 14631.9;
          else if (purity.includes("22k")) ratePerGram = rates.goldCalculated?.k22 || 13022.39;
          else if (purity.includes("20k")) ratePerGram = rates.goldCalculated?.k20 || 12290.8;
          else if (purity.includes("18k")) ratePerGram = rates.goldCalculated?.k18 || 11120.24;
          else if (purity.includes("14k")) ratePerGram = rates.goldCalculated?.k14 || 8486.5;
          else if (purity.includes("999")) ratePerGram = (rates.silverCalculated?.s999 || 226998) / 1000;
          else if (purity.includes("925")) ratePerGram = (rates.silverCalculated?.s925 || 209973.15) / 1000;
          else ratePerGram = 0;
          rateLabel = `₹${ratePerGram.toLocaleString("en-IN")}/g`;
        }

        if (!cancelled) setGoldRate(rateLabel);

        const weight =
          parseFloat(
            product.grossWeightGrams || product.weightGrams || product.weight
          ) || 10;
        const makingPercent =
          parseFloat(
            product.makingChargePercent ||
              product.makingCharges ||
              product.makingChargeValue ||
              12
          );
        const otherCharges =
          parseFloat(
            product.otherCharges ||
              product.otherCharge ||
              product.otherChargesValue ||
              product.otherChargeValue ||
              product.hallmarkCharges ||
              product.hallmarkCharge ||
              0
          ) || 0;

        let metalValue = product.metalValue > 0 ? product.metalValue : Math.round(weight * ratePerGram);
        let makingCharge = product.makingCharge > 0 ? product.makingCharge : Math.round(metalValue * (makingPercent / 100));
        let stoneValue = parseFloat(product.stoneValue || product.stonePrice) || 0;
        let subtotal = metalValue + makingCharge + stoneValue + otherCharges;
        let gstPercent = parseFloat(product.gstPercent || product.gstValue || 3);
        let gst = product.gst > 0 ? product.gst : Math.round(subtotal * (gstPercent / 100));
        let total = product.calculatedPrice > 0 ? product.calculatedPrice : (subtotal + gst);

        if (product.isFixedPrice && product.fixedPrice > 0) {
          total = product.fixedPrice;
          gst = Math.round(total * (gstPercent / (100 + gstPercent)));
          subtotal = total - gst;
          metalValue = subtotal;
          makingCharge = 0;
        }

        const discountPercent =
          parseFloat(product.discountPercent || product.discount) || 0;
        const mrp =
          discountPercent > 0
            ? Math.round(total * (1 + discountPercent / 100))
            : null;

        if (!cancelled) {
          setBreakdown({
            ratePerGram: product.baseRate || ratePerGram,
            rateLabel,
            metalValue,
            makingCharge,
            makingChargePercent: makingPercent,
            otherCharges,
            stoneValue,
            subtotal,
            gst,
            gstPercent,
            total,
            mrp,
            hasDiscount: !!mrp,
          });
          setLoading(false);
        }
      } catch {
        if (!cancelled) setLoading(false);
      }
    }
    compute();
    return () => { cancelled = true; };
  }, [product]);

  return { breakdown, loading, goldRate };
}
