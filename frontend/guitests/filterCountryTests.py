import unittest
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.common.exceptions import NoSuchElementException
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.action_chains import ActionChains


import sys
import time

PATH = ""

URL = "https://www.lyriccheck.me/country"
# URL = "http://127.0.0.1:3000/country"


class TestNavbar(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        chrome_options = Options()
        chrome_options.add_argument("--headless")
        chrome_options.add_argument("--no-sandbox")
        chrome_options.add_argument("--disable-dev-shm-usage")
        s = Service(PATH)
        cls.driver = webdriver.Chrome(executable_path=PATH, options=chrome_options)
        cls.driver.get(URL)

    @classmethod
    def tearDownClass(cls):
        cls.driver.quit()

    def testFilterRegion(self):
        try:
            open_filter = self.driver.find_element(
                By.XPATH, ".//button[@class='accordion-button collapsed']"
            )
            self.driver.execute_script("arguments[0].click()", open_filter)
        except NoSuchElementException:
            pass

        time.sleep(1)
        region_dropdown = self.driver.find_element(
            By.XPATH, ".//div[@id='region-select']"
        )
        region_dropdown.click()
        time.sleep(1)
        europe = self.driver.find_element(By.XPATH, ".//li[@data-value='Europe']")
        self.driver.execute_script("arguments[0].click()", europe)
        time.sleep(1)
        submit = self.driver.find_element(By.XPATH, ".//button[@type='submit']")
        self.driver.execute_script("arguments[0].click()", submit)
        time.sleep(1)
        region_names = self.driver.find_elements(
            By.XPATH, ".//div[@aria-colindex=4]//span//span"
        )

        for name in region_names:
            assert name.get_attribute("innerHTML") == "Europe"

    # def testFilterTopArtist(self):
    #     try:
    #         open_filter = self.driver.find_element(By.XPATH, ".//button[@class='accordion-button collapsed']")
    #         self.driver.execute_script("arguments[0].click()", open_filter)
    #     except NoSuchElementException:
    #         pass

    #     time.sleep(1)
    #     top_artist_dropdown = self.driver.find_element(By.XPATH, ".//div[@id='top-artist-select']")
    #     time.sleep(1)
    #     actions = ActionChains(self.driver);
    #     actions.move_to_element(top_artist_dropdown).click().perform()
    #     # top_artist_dropdown.click()
    #     # self.driver.execute_script("arguments[0].click()", region_dropdown)
    #     # time.sleep(1)
    #     coldplay = self.driver.find_element(By.XPATH, ".//li[@data-value='Radiohead']")
    #     self.driver.execute_script("arguments[0].click()", coldplay)
    #     time.sleep(1)
    #     submit = self.driver.find_element(By.XPATH, ".//button[@type='submit']")
    #     self.driver.execute_script("arguments[0].click()", submit)
    #     time.sleep(1)
    #     top_artist_names = self.driver.find_elements(By.XPATH, ".//div[@aria-colindex=6]//span//span")

    #     for name in top_artist_names:
    #         assert(name.get_attribute("innerHTML") == "Coldplay")


if __name__ == "__main__":
    PATH = sys.argv[1]
    unittest.main(argv=["first-arg-is-ignored"])
