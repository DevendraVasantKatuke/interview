## Country
country										IN 																											name, currency_symbol, currency_decimals, financial_year(DDMMM-DDMMM), dialing_code, phone_number_regex, direct_tax_regex, indirect_tax_regex
province									IN.31																										name, [districts]

## Person
person 										IN.AHLPK2640N																								name, logo, phone_number, password, [contact_info], is_verified, is_active
person_wallet                               IN.AHLPK2640N.p_acc_number																					if_not_cash_wallet => {name, branch, ifsc}, is_active if_cash_wallet => acc_number is 'cash'

## Product
category 									[2AN]																										name
sub_category                                [2AN].[2AN]																									name
genre                                       [4B36]																										name, {specifications}
hs_code                                     [2N.2N.2N.2N]																								[descriptions]
manufacturer 								IN.AHLPK2640N.[5B36]																						name, logo, phone_number, indirect_tax_id, {licences}, is_verified, is_active
product                                     IN.AHLPK2640N.[5B36].[4B36]																					sub_category, genre, hs_code, name, logo, sale_as, {specifications}, packing_name, unit_name, units_per_pack, indirect_tax_rate, cess, mrp, is_verified, is_active
product_batch 								IN.AHLPK2640N.[5B36].[4B36].batch 																			mfg_date, use_before_date, mrp

## Transporter
transporter                                 IN.AHLPK2640N.[5B36]																						name, logo, indirect_tax_id, phone_number, lat_lng, address, is_verified, is_active

## Referer
referer 									IN.AHLPK2640N.[5B36]																						name, phone_number, logo, licence_authority, licence_number, district, province, address, is_verified, is_active

## Trader
trader										IN.AHLPK2640N.[5B36]																						name, logo, phone_number, password, [registrations], [contact_info], is_verified, is_active
trader_wallet								IN.AHLPK2640N.t_acc_number																					if_not_cash_wallet => {name, branch, ifsc}, is_active if_cash_wallet => acc_number is 'cash'
trader_equity                               IN.AHLPK2640N.[5B36].from_p/t_acc_number.to_t/p_acc_number													on_date, amount, from_wallet_text, to_wallet_text, remark
trader_money_transfer						IN.AHLPK2640N.[5B36].from_t_acc_number.to_t_acc_number														on_date, amount, from_wallet_text, to_wallet_text, remark
trader_expense                            	IN.AHLPK2640N.[5B36].[3B36]																					group, sub_group
trader_expense_transaction            		IN.AHLPK2640N.[5B36].[3B36].t_acc_number.on_date															amount, realised_date, wallet_text, remark, asset_value

## Shop
indirect_tax_id								IN.31AHLPK2640N1Z1																							scheme, is_verified, is_active
shop 										IN.31AHLPK2640N1Z1.[4B36]																					title, phone_number, password, is_ppob, vertical, district, address, [licences]
shop_wallet									IN.31AHLPK2640N1Z1.[4B36].s_acc_number																		if_not_cash_wallet => {name, branch, ifsc}, is_active if_cash_wallet => account_number is 'cash'
shop_expense                            	IN.31AHLPK2640N1Z1.[4B36].[3B36]																			group, sub_group
shop_expense_transaction            		IN.31AHLPK2640N1Z1.[4B36].[3B36].s/t_acc_number.on_date														amount, realised_date, wallet_text, remark, asset_value
shelf 										IN.31AHLPK2640N1Z1.[4B36].code 																				is_reconciled
shop_product								IN.31AHLPK2640N1Z1.[4B36].IN.AHLPK2640N.[5B36].[4B36]														shelf_code, day_slab, day_slabs, indented_units, is_reconciled
shop_referer								IN.31AHLPK2640N1Z1.[4B36].IN.AHLPK2640N.[5B36]
shop_transporter							IN.31AHLPK2640N1Z1.[4B36].IN.AHLPK2640N.[5B36]
shop_consumer								IN.31AHLPK2640N1Z1.[4B36].IN.AHLPK2640N.[5B36]																opening_balance
shop_customer								IN.31AHLPK2640N1Z1.[4B36].IN.AHLPK2640N.[5B36]																opening_balance
shop_vendor									IN.31AHLPK2640N1Z1.[4B36].IN.AHLPK2640N.[5B36]																opening_balance

## Purchase Order 							[Referer.Buyer.OnDate.Product]
consumer_purchase_order						IN.AHLPK2640N.IN.AHLPK2640N.on_date																			IN.31AHLPK2640N1Z1.[4B36] if_no_referer => Consumwe is Referer [Referer].[Consumer]  
customer_purchase_order						IN.AHLPK2640N.IN.27AHLPK2640N1Z1.[4B36].on_date																IN.31AHLPK2640N1Z1.[4B36] if_no_referer => Customer is Referer [Referer].[Customer]
consumer_ordered_item 						IN.AHLPK2640N.IN.AHLPK2640N.on_date.IN.AHLPK2640N.[5B36].[4B36]												suggested_units (from referer), units, rate, indirect_tax_rate, remark(Doses)
customer_ordered_item						IN.AHLPK2640N.IN.27AHLPK2640N1Z1.[4B36].on_date.IN.AHLPK2640N.[5B36].[4B36]									suggested_units (from referer), units, rate, indirect_tax_rate, remark

## Purchase 								[Buyer.OurShop.OnDate.Product.Batch]
consumer_purchase 							IN.AHLPK2640N.IN.31AHLPK2640N1Z1.on_date 																	referer, bill_discount, indirect_tax_invoice_action, logistic
customer_purchase                        	IN.27AHLPK2640N1Z1.[4B36].IN.31AHLPK2640N1Z1.[4B36].on_date 												referer, bill_discount, indirect_tax_invoice_action, logistic
consumer_purchase_transaction 				IN.AHLPK2640N.IN.31AHLPK2640N1Z1.on_date.p_acc_number.on_date 												amount, realised_date, wallet_text, remark
customer_purchase_transaction 				IN.27AHLPK2640N1Z1.[4B36].IN.31AHLPK2640N1Z1.[4B36].on_date.s/t_acc_number.on_date 							amount, realised_date, wallet_text, remark
consumer_received_item						IN.AHLPK2640N.IN.AHLPK2640N.on_date.IN.AHLPK2640N.[5B36].[4B36].batch 										units, available, units_to_return
customer_received_item						IN.27AHLPK2640N1Z1.[4B36].IN.31AHLPK2640N1Z1.[4B36].on_date.IN.AHLPK2640N.[5B36].[4B36].batch 				units, available, units_to_return

## Purchase Return 							[Buyer.OurShop.OnDate.Product.Batch]
consumer_purchase_return					IN.31AHLPK2640N1Z1.[4B36].IN.AHLPK2640N.on_date																indirect_tax_invoice_action, logistic
customer_purchase_return					IN.31AHLPK2640N1Z1.[4B36].IN.27AHLPK2640N1Z1.[4B36].on_date													indirect_tax_invoice_action, logistic
consumer_purchase_return_transaction 		IN.31AHLPK2640N1Z1.[4B36].IN.AHLPK2640N.on_date.p_acc_number.on_date 										amount, realised_date, wallet_text, remark
customer_purchase_return_transaction		IN.31AHLPK2640N1Z1.[4B36].IN.27AHLPK2640N1Z1.[4B36].on_date.s/t_acc_number.on_date							amount, realised_date, wallet_text, remark
consumer_returned_item 						IN.31AHLPK2640N1Z1.[4B36].IN.AHLPK2640N.on_date.IN.AHLPK2640N.[5B36].[4B36].batch							units, remark
customer_returned_item						IN.31AHLPK2640N1Z1.[4B36].IN.27AHLPK2640N1Z1.[4B36].on_date.IN.AHLPK2640N.[5B36].[4B36].batch 				units, remark

## Logistic									[Buyer.OurShop.OnDate.Transporter]
consumer_logistic 							IN.AHLPK2640N.IN.31AHLPK2640N1Z1[5B36].on_date.IN.AHLPK2640N.[5b86].on_date									vehicle_number, various_costs, indirect_tax_cost, indirect_tax_cess_cost, details
customer_logistic 							IN.27AHLPK2640N1Z1.[4B36].IN.31AHLPK2640N1Z1.[4B36].on_date.IN.AHLPK2640N.[5B36]							vehicle_number, various_costs, indirect_tax_cost, indirect_tax_cess_cost, details
consumer_logistic_transaction 				IN.AHLPK2640N.IN.31AHLPK2640N1Z1[5B36].on_date.IN.AHLPK2640N.[5b86].on_date.p_acc_number.on_date 			amount, realised_date, wallet_text, remark
customer_logistic_transaction 				IN.27AHLPK2640N1Z1.[4B36].IN.31AHLPK2640N1Z1.[4B36].on_date.IN.AHLPK2640N.[5B36].s/t_acc_number.on_date 	amount, realised_date, wallet_text, remark

## Stock add 								[OurShop.OurShop.OnDate.Product.Batch]
customer_received_item						IN.31AHLPK2640N1Z1.[4B36].IN.27AHLPK2640N1Z1.[4B36].on_date.IN.AHLPK2640N.[5B36].[4B36].batch 				units, available, units_to_return(0)

## Stock Reduce								[OurShop.OurShop.OnDate.Product.Batch]
customer_returned_item						IN.31AHLPK2640N1Z1.[4B36].IN.27AHLPK2640N1Z1.[4B36].on_date.IN.AHLPK2640N.[5B36].[4B36].batch 				units, remark