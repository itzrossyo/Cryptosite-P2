document.getElementById("buyAmount").addEventListener("input", updateTotalCost);
        document.getElementById("sellAmount").addEventListener("input", updateSellPrice);

        function updateTotalCost() {
            const amountToBuy = document.getElementById("buyAmount").value;
            const costPerCoin = 1000;
            const totalCost = amountToBuy * costPerCoin;
            document.getElementById("totalCost").textContent = totalCost;
        }

        function updateSellPrice() {
            const amountToSell = document.getElementById("sellAmount").value;
            const pricePerCoin = 900;
            const sellPrice = amountToSell * pricePerCoin;
            document.getElementById("sellPrice").textContent = sellPrice;
        }

        function clearForm() {
            document.getElementById("coinForm").reset();
            document.getElementById("totalCost").textContent = 0;
            document.getElementById("sellPrice").textContent = 0;
        }

        document.querySelectorAll('input[name="action"]').forEach(function(radio) {
            radio.addEventListener("change", function() {
        
                const sellSection = document.getElementById("sellSection");
                const buyAmountInput = document.getElementById("buyAmount");
                const sellAmountInput = document.getElementById("sellAmount");

                if (this.value === "buy") {
        
                    buyAmountInput.removeAttribute("disabled");
                    sellAmountInput.setAttribute("disabled", "disabled");
                } else {
     
                    sellAmountInput.removeAttribute("disabled");
                    buyAmountInput.setAttribute("disabled", "disabled");
                }
            });
        });