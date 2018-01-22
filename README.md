# FPBeuthToken
  
  
## TODO 

- zeiger auf anzuzeigende werbung TESTEN
- alles ausführlich testen
- sinnvolle Kommentare
- contracts in mehrere dateien trennen?

Web3:
- Investor-Account erstellen
- Investor kauft für Ether eine bestimmte Anzahl von Tokens
- Veränderung in der Balanceof Investor und Token-Contract anzeigen
- Investor fügt Werbung mit bestimmten Wert hinzu
- Veränderung in der Balanceof Investor und Token-Contract anzeigen und die Advertisement-Liste anzeigen

- User-Account erstellen
- User lädt sein Handy für eine bestimmte Zeit und konsumiert dabei Werbung
- Veränderung in der Balanceof User und Token-Contract anzeigen und die Advertisement-Liste anzeigen

Abschlusspräsentation:
- siehe Google-Drive

zurückgestellt:
- owner und balanceOf[owner] (Hauptkonto) voneinander trennen, sonst Probleme nach transferOwnership(...)

erledigt:

- zeiger auf anzuzeigende werbung implementieren, zeiger auf freie werbung darf ihn nicht überholen
- implementieren: Liste/HashMap für die User (address, balance)
- implementieren: getCoinCount() const returns (uint coinCount) {}
- implementieren: buyAdvert(string url) payable {}
- implementieren: getAdvertValue(string url) const returns (uint value) {}
- implementieren: buyGood(uint value) returns (bool success){}
- Umbenennen: investorBalance -> balanceOf
- Andere Typen: advert -> (uniqueId => Advertisement)
- Funktion: buyGood(...): +Gutschrift auf Hauptkonto
- Neues Attribut: Advertisement: +id
- Funktion: getAdvertValue(...): Advert-id erhalten, dann prüfen ob Advert dem msg.sender gehört, value returnen
- implementieren: Liste/HashMap für die Investoren/Werbung (fromAddress, advertUrl, value)
- implementieren: charge(uint percentCharged, string advertWatched) {}
- implementieren: getAdvert() const returns (string advertUrl) {}
- was machen mit leeren Werbungen in der Hashmap?
- (implementieren: advertId zu "richtiger" eindeutigen ID machen?)
