const alchemyApiKey = "<YOUR_KEY_HERE";

const networks = [
  { name: "Ethereum Mainnet", network: "eth-mainnet" },
  { name: "Base Mainnet", network: "base-mainnet" },
  { name: "Optimism Mainnet", network: "opt-mainnet" },
  { name: "Arbitrum Mainnet", network: "arb-mainnet" },
];

const wallets = [
"0x7Ad731E8b0263896eD5d0DD679128719a306CdEE",
"0xabc45198100a01e9e07ac2a304f5d002d3005018",
"0x0455aeb2A8f6E033a4906671102c0B992e4af8C1",
"0xdFFDF2728d50b777648B9B8DA61eDB9318Bd60cE",
"0x1531be9d6f3d6B001B9Ec9b35eD5466f66cf9E06",
"0x7110D94153cCBf0a6F9D11527648549516b4C809",
"0x9BDCf7dA2119dfe974967A848C7a49C9376b1b44",
"0x8aA5772dc03aE73D01b7d6f11362d8E1345ccF06",
"0xdc453E01c0E2E0E5d36545E70ff38342ed65ab0d",
"0x3ac289e029bc05374d880244fc7aff966f000b34",
"0x2d7Bb1313bd2EA36dE9358241fFd674e3bED5a4F",
"0xd6fF60a24bb0917BC3D6D76A0E551d591D9bd5Ac",
"0xeE00CFF9656F2f432FEb768803F8233dCcbD7bd5",
"0x062780A9275e18D1Df979e38E0767774D01A10C0",
"0x1dbB95e4f2c7Ad1d7CaA36CD60f468C559158811",
"0x2c5d7559cAbf3c9Ee67c92899f7e3bB58E99Aa01",
"0x46db2fbfe2bbe35b66c70cc9e1dc61f82a6a8ff5",
"0x3442BFf38Da294EC9cfa7ecD29581cb048aE9107",
"0xeca0B6454eFf51b7b6092cB85C7F6848b262BA19",
"0x751c3268e710945Ad162b88CE52c05706f8C0a99",
"0x3AA2De63213c6ee852544320E1013eA97A8F2972",
"0xc25E2537c404170651D620f0BC53C369Dfa552B8",
"0x5de39A74e8A85789c579bd030633f1607A935374",
"0xBf3aB49638A5b100dA43CBdFD9851D61a922483d"
];

const tokenNames = {
"0xae78736Cd615f374D3085123A210448E74Fc6393": "rETH",
"0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48": "USDC-E",
"0xD101dCC414F310268c37eEb4cD376CcFA507F571": "RSC",
"0x4200000000000000000000000000000000000042": "OP",
"0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85": "USDC-O",
"0x78a087d713Be963Bf307b18F2Ff8122EF9A63ae9": "BSWAP",
"0xB1a03EdA10342529bBF8EB700a06C60441fEf25d": "MIGGLES",
"0x940181a94A35A4569E4529A3CDfB74e38FD98631": "AERO",
"0x0d97F261b1e88845184f678e2d1e7a98D9FD38dE": "TYBG",
"0x1121AcC14c63f3C872BFcA497d10926A6098AAc5": "DOGE-E",
"0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913": "USDC-B",
"0x0b3e328455c4059EEb9e3f84b5543F74E24e7E1b": "VIRTUAL",
"0x548f93779fBC992010C07467cBaf329DD5F059B7": "BMX",
"0x35bfE9427d37cEc78ea1EB9fa922f12Ae8A32547": "ETHPRINTER",
"0x2D57C47BC5D2432FEEEdf2c9150162A9862D3cCf": "DICKBUTT",
"0xaf88d065e77c8cC2239327C5EDb3A432268e5831": "USDC-A",
};

const tokenDecimals = {
"0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48": 6, // USDC-E
"0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913": 6, // USDC-B
"0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85": 6, // USDC-O
"0xaf88d065e77c8cC2239327C5EDb3A432268e5831": 6, // USDC-A
};

const alchemyUrls = {
  "eth-mainnet": `https://eth-mainnet.g.alchemy.com/v2/${alchemyApiKey}`,
  "base-mainnet": `https://base-mainnet.g.alchemy.com/v2/${alchemyApiKey}`,
  "opt-mainnet": `https://opt-mainnet.g.alchemy.com/v2/${alchemyApiKey}`,
  "arb-mainnet": `https://arb-mainnet.g.alchemy.com/v2/${alchemyApiKey}`,
};  

const wethContracts = {
    "arb-mainnet": "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1",
    "opt-mainnet": "0x4200000000000000000000000000000000000006",
    "eth-mainnet": "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    "base-mainnet": "0x4200000000000000000000000000000000000006"
};  

function fetchOnchainData() {
  let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("AppScript Results");
  if (!sheet) {
    sheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet("AppScript Results");
  } else {
    sheet.clear();
  }

  fetchETHBalances(sheet);
  fetchWETHBalances(sheet);
  fetchTokenBalances(sheet);
  fetchAndInsertTokenPrices(sheet);
  fetchrETHRate(sheet);
  fetchSolanaBalances(sheet);
}

function callAlchemyAPI(method, params, network) {
    if (!alchemyUrls.hasOwnProperty(network)) {
        console.error(`Error: Network '${network}' not found in alchemyUrls.`);
        return null;
    }

    let url = alchemyUrls[network]; // Get the correct Alchemy URL
    let retries = 3; // Retry logic

    while (retries > 0) {
        try {
            const options = {
                method: "POST",
                contentType: "application/json",
                payload: JSON.stringify({
                    jsonrpc: "2.0",
                    id: 1,
                    method: method,
                    params: params
                }),
                muteHttpExceptions: true
            };

            const response = UrlFetchApp.fetch(url, options);
            const json = JSON.parse(response.getContentText());

            if (json.result) {
                return json.result; // Return valid data
            }
        } catch (e) {
            console.error(`Error fetching from Alchemy API: ${e}`);
            Utilities.sleep(2000); // Wait before retrying
            retries--;
        }
    }
    return null; // Return null if all retries fail
}

function fetchETHBalances(sheet) {
    sheet.appendRow(["ETH Balances"]);
    sheet.appendRow(["Address", "Network", "Amount"]);

    let totalETHBalance = 0;

    wallets.forEach(wallet => {
        networks.forEach(network => {
            console.log(`Fetching ETH balance for ${wallet} on ${network.name} (${network.network})`);

            const balance = callAlchemyAPI("eth_getBalance", [wallet, "latest"], network.network);
            if (balance) {
                const ethBalance = parseInt(balance, 16) / 1e18; // Convert HEX to decimal
                
                if (ethBalance > 0) { // Skip if balance is zero
                    sheet.appendRow([wallet, network.name, ethBalance]);
                    totalETHBalance += ethBalance; // Add to total balance
                }
            }
        });
    });

    sheet.appendRow(["ETH Total Balance", "", totalETHBalance]); // Total balance row
}

function fetchWETHBalances(sheet) {
    sheet.appendRow(["WETH Balances"]);
    sheet.appendRow(["Address", "Network", "Amount"]);

    let totalWETHBalance = 0;

    wallets.forEach(wallet => {
        networks.forEach(network => {
            console.log(`Fetching WETH balance for ${wallet} on ${network.name} (${network.network})`);

            const tokenAddress = wethContracts[network.network];

            if (!tokenAddress) {
                console.error(`Error: No WETH contract address found for ${network.network}`);
                return;
            }

            const response = callAlchemyAPI("alchemy_getTokenBalances", [wallet, [tokenAddress]], network.network);

            if (response && response.tokenBalances.length > 0) {
                const balanceData = response.tokenBalances[0];
                const balance = parseInt(balanceData.tokenBalance, 16) / 1e18;

                if (balance > 0) { // Skip if balance is zero
                    sheet.appendRow([wallet, network.name, balance]);
                    totalWETHBalance += balance; // Add to total balance
                }
            }
        });
    });

    sheet.appendRow(["WETH Total Balance", "", totalWETHBalance]); // Total balance row
}

function fetchTokenBalances(sheet) {
    sheet.appendRow(["Token Balances"]);
    sheet.appendRow(["Network", "Wallet Address", "Token Name", "Amount"]);

    let tokenTotals = {}; // Object to store total balance per token

    wallets.forEach(wallet => {
        networks.forEach(network => {
            console.log(`Fetching token balances for ${wallet} on ${network.name} (${network.network})`);

            if (!alchemyUrls.hasOwnProperty(network.network)) {
                console.error(`Error: Network '${network.network}' not found in alchemyUrls.`);
                return;
            }

            Object.keys(tokenNames).forEach(tokenAddress => {
                const response = callAlchemyAPI("alchemy_getTokenBalances", [wallet, [tokenAddress]], network.network);

                if (response && response.tokenBalances.length > 0) {
                    const balanceData = response.tokenBalances[0];
                    const balance = parseInt(balanceData.tokenBalance, 16) / Math.pow(10, tokenDecimals[tokenAddress] || 18);

                    if (balance > 0) { // Skip if balance is zero
                        sheet.appendRow([network.name, wallet, tokenNames[tokenAddress], balance]);

                        // Aggregate total balance for each token
                        if (!tokenTotals[tokenAddress]) {
                            tokenTotals[tokenAddress] = 0;
                        }
                        tokenTotals[tokenAddress] += balance;
                    }
                }
            });
        });
    });

    // Append total balances per token
    sheet.appendRow(["Token Total Balances"]);
    sheet.appendRow(["Token Name", "Total Amount"]);
    Object.keys(tokenTotals).forEach(tokenAddress => {
        sheet.appendRow([tokenNames[tokenAddress], tokenTotals[tokenAddress]]);
    });
}

function fetchAssetPrices(sheet) {
    sheet.appendRow(["Asset Prices"]);
    sheet.appendRow(["Token Name", "Price (USD)"]);

    const tokenPricesBySymbol = fetchTokenPricesBySymbol();
    const additionalTokenData = fetchAdditionalTokenDataByAddress();

    // Write token prices fetched by symbol
    if (tokenPricesBySymbol.length > 0) {
        tokenPricesBySymbol.forEach(token => {
            sheet.appendRow([token.name, token.price]);
        });
    }

    // Write additional token prices fetched by address
    if (additionalTokenData.length > 0) {
        additionalTokenData.forEach(row => {
            sheet.appendRow(row);
        });
    }

    sheet.appendRow(["---------------------"]); // Spacer row
}

function fetchAndInsertTokenPrices(sheet) {
    const baseUrl = `https://api.g.alchemy.com/prices/v1/${alchemyApiKey}`;

    const addressToName = {
        "0xae78736Cd615f374D3085123A210448E74Fc6393": "rETH",
        "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48": "USDC",
        "0xD101dCC414F310268c37eEb4cD376CcFA507F571": "RSC",
        "0x1121AcC14c63f3C872BFcA497d10926A6098AAc5": "DOGE-E",
        "0xB1a03EdA10342529bBF8EB700a06C60441fEf25d": "MIGGLES",
        "0x940181a94A35A4569E4529A3CDfB74e38FD98631": "AERO",
        "0x0d97F261b1e88845184f678e2d1e7a98D9FD38dE": "TYBG",
        "0x0b3e328455c4059EEb9e3f84b5543F74E24e7E1b": "VIRTUAL",
        "0x548f93779fBC992010C07467cBaf329DD5F059B7": "BMX",
        "0x35bfE9427d37cEc78ea1EB9fa922f12Ae8A32547": "ETHPRINTER",
        "0x2D57C47BC5D2432FEEEdf2c9150162A9862D3cCf": "DICKBUTT",
        "0x4200000000000000000000000000000000000042": "OP",
    };

    // 🔹 **Fetch token prices by symbol (GET)**
    const fetchTokenPricesBySymbol = () => {
        const url = `${baseUrl}/tokens/by-symbol?symbols=ETH&symbols=SOL&symbols=DOGE`;

        try {
            const response = UrlFetchApp.fetch(url, { method: "GET", muteHttpExceptions: true });
            const data = JSON.parse(response.getContentText());

            Logger.log("API Response (Symbol Prices): " + JSON.stringify(data));

            return data.data?.map(token => [
                token.symbol,
                token.prices?.[0]?.value || "N/A"
            ]) || [];
        } catch (err) {
            Logger.log("Error fetching token prices by symbol: " + err);
            return [];
        }
    };

    // 🔹 **Fetch token prices by address (POST)**
    const fetchTokenPricesByAddress = () => {
        const options = {
            method: 'POST',
            headers: { accept: 'application/json', 'content-type': 'application/json' },
            payload: JSON.stringify({
                addresses: [
          { network: 'eth-mainnet', address: '0xae78736Cd615f374D3085123A210448E74Fc6393' },
          { network: 'eth-mainnet', address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48' },
          { network: 'eth-mainnet', address: '0xD101dCC414F310268c37eEb4cD376CcFA507F571' },
          { network: 'eth-mainnet', address: '0x1121AcC14c63f3C872BFcA497d10926A6098AAc5' },
          { network: 'base-mainnet', address: '0xB1a03EdA10342529bBF8EB700a06C60441fEf25d' },
          { network: 'base-mainnet', address: '0x940181a94A35A4569E4529A3CDfB74e38FD98631' },
          { network: 'base-mainnet', address: '0x0d97F261b1e88845184f678e2d1e7a98D9FD38dE' },
          { network: 'base-mainnet', address: '0x0b3e328455c4059EEb9e3f84b5543F74E24e7E1b' },
          { network: 'base-mainnet', address: '0x548f93779fBC992010C07467cBaf329DD5F059B7' },
          { network: 'base-mainnet', address: '0x35bfE9427d37cEc78ea1EB9fa922f12Ae8A32547' },
          { network: 'base-mainnet', address: '0x2D57C47BC5D2432FEEEdf2c9150162A9862D3cCf' },
          { network: 'opt-mainnet', address: '0x4200000000000000000000000000000000000042' },
                ]
            })
        };

        try {
            const response = UrlFetchApp.fetch(`${baseUrl}/tokens/by-address`, options);
            const data = JSON.parse(response.getContentText());

            Logger.log("API Response (Address Prices): " + JSON.stringify(data));

            return data.data?.map(token => [
                addressToName[token.address] || token.address,
                token.prices?.[0]?.value || "N/A"
            ]) || [];
        } catch (err) {
            Logger.log("Error fetching token prices by address: " + err);
            return [];
        }
    };

    // 🔹 **Fetch Data**
    const tokenPricesBySymbol = fetchTokenPricesBySymbol();
    const tokenPricesByAddress = fetchTokenPricesByAddress();

    // 🔹 **Combine and Write Data**
    const combinedData = [
        ["Token Name", "Price (USD)"],
        ...tokenPricesBySymbol,
        ...tokenPricesByAddress,
    ];

    if (combinedData.length > 1) { // Ensure data exists
        combinedData.forEach(row => sheet.appendRow(row)); // Append each row separately
    } else {
        Logger.log("No token price data available.");
    }
}

function fetchrETHRate(sheet) {
  const alchemyApiUrl = "https://eth-mainnet.g.alchemy.com/v2/<YOUR_KEY_HERE>";
    const rETH_ADDRESS = "0xae78736Cd615f374D3085123A210448E74Fc6393";

    // Encoded function call for getExchangeRate() in Ethereum JSON-RPC format
    const encodedData = "0xe6aa216c"; 

    // JSON-RPC payload for eth_call
    const payload = {
        jsonrpc: "2.0",
        id: 1,
        method: "eth_call",
        params: [
            {
                to: rETH_ADDRESS,
                data: encodedData
            },
            "latest"
        ]
    };

    try {
        // Fetch data from Alchemy
        const response = UrlFetchApp.fetch(alchemyApiUrl, {
            method: "post",
            contentType: "application/json",
            payload: JSON.stringify(payload),
            muteHttpExceptions: true
        });

        const responseText = response.getContentText();
        Logger.log("Raw API Response: " + responseText); // Log full response

        const result = JSON.parse(responseText);

        // Check for errors
        if (result.error) {
            Logger.log("Alchemy API Error: " + JSON.stringify(result.error, null, 2));
            return;
        }

        // Convert HEX to decimal and scale down from wei
        const exchangeRate = parseInt(result.result, 16) / 1e18;
        const timestamp = new Date().toISOString();

        Logger.log(`1 rETH = ${exchangeRate} ETH`);

        // Insert into Google Sheet
        sheet.appendRow(["Timestamp", "rETH to ETH Exchange Rate"]);
        sheet.appendRow([timestamp, exchangeRate]);

    } catch (error) {
        Logger.log("Script Error: " + error.toString());
    }
}

function fetchSolanaBalances(sheet) {
    const duneApiKey = "<YOUR_KEY_HERE>";
    const duneApiBaseUrl = "https://api.dune.com/api/echo/beta/balances/svm";

    // Ensure `solanaAddresses` is defined
    const solanaAddresses = [
        "FwHFd8bTryK131BpWaqc7bdAGKChRtPK3RoWpTW5wQMu",
        "CkaWK2A7pXWSieTQ8cnMRQaMDTbH3MLVX12bfVo8M5C"
    ];

    sheet.appendRow(["Solana Token Balances"]);
    sheet.appendRow(["Wallet Address", "Chain", "Token Symbol", "Balance", "Value (USD)"]);

    solanaAddresses.forEach(wallet => {
        const url = `${duneApiBaseUrl}/${wallet}`;
        const options = {
            method: "GET",
            headers: {
                "X-Dune-Api-Key": duneApiKey
            },
            muteHttpExceptions: true
        };

        try {
            const response = UrlFetchApp.fetch(url, options);
            if (response.getResponseCode() !== 200) {
                Logger.log(`API error for wallet ${wallet}: ${response.getContentText()}`);
                return;
            }

            const data = JSON.parse(response.getContentText());
            if (!data?.balances?.length) {
                Logger.log(`No balances found for wallet ${wallet}.`);
                return;
            }

            // Process all balances
            data.balances.forEach(balance => {
                const formattedBalance = balance.amount / Math.pow(10, balance.decimals);
                const valueUSD = balance.value_usd ? balance.value_usd.toFixed(2) : "N/A";

                sheet.appendRow([
                    data.wallet_address,
                    balance.chain,
                    balance.symbol || "Unknown",
                    formattedBalance.toFixed(4),
                    valueUSD
                ]);

                Logger.log(`Balance for ${balance.symbol} on ${balance.chain}: ${formattedBalance} (${valueUSD} USD)`);
            });

        } catch (error) {
            Logger.log(`Error fetching balance for wallet ${wallet}: ${error}`);
        }
    });
}
