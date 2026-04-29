import configparser
import os
import sys

# --- CLASSI STATICHE  --------------------------------

class Predefiniti_Ricerca:

    query_predefinita: str = ""
    tipo_predefinito:  str = "descrizione_esame"  # "codice_ministeriale" | "codice_interno" | "descrizione_esame"


# --- LOADER GENERICO --------------------------------


def carica_configurazione():
    config_path = os.path.join(os.path.dirname(__file__), "config.ini")

    if not os.path.exists(config_path):
        return  

    parser = configparser.ConfigParser(inline_comment_prefixes=("#",))
    parser.read(config_path, encoding="utf-8")

    for section in parser.sections():
        class_name = f"Predefiniti_{section}"

        
        target_class = getattr(sys.modules[__name__], class_name, None)

        if target_class is None:
            continue  

        for key, raw_value in parser.items(section):
        
            prop = next(
                (p for p in vars(target_class) if p.lower() == key.lower()),
                None
            )

            if prop is None:
                continue  

          
            default_value = getattr(target_class, prop)
            converted = _converti(raw_value, type(default_value))

            if converted is not None:
                setattr(target_class, prop, converted)


def _converti(valore: str, tipo: type):
    """Converte la stringa del .ini nel tipo atteso. Ritorna None se non compatibile."""
    valore = valore.strip().strip('"') 
    try:
        if tipo == bool:
            return valore.lower() in ("1", "true", "yes")
        if tipo == int:
            return int(valore)
        if tipo == float:
            return float(valore)
        if tipo == str:
            return valore
    except (ValueError, TypeError):
        return None  