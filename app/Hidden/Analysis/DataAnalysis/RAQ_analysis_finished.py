import logging
import json

logger = logging.getLogger("RAQ_ANALYSIS")

def functionA():
    logger.info("Done functionA")
    return None

def functionB():
    NIST_crit = open('./app/Interface/MainApplication/Data/NIST_criteria.json')
    NIST_crit = json.load(NIST_crit)
    logger.info("Doing stuff")
    logger.info(NIST_crit)

if __name__ == '__main__':
    try:
        
        log_fmt = '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
        logging.basicConfig(level=logging.INFO, format=log_fmt,
                            handlers= [
                                logging.FileHandler("./data.log", mode = "w"),
                                logging.StreamHandler()
                            ])
        
        raq_file = open('./app/Hidden/Data/data_config.json')

        RAQ_answers = json.load(raq_file)

        logger.info("Running in")

        logger.info(RAQ_answers)

        functionA()
        functionB()

    except Exception as e:
        logger.error(e)