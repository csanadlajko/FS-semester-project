import os

class CommonFileConstants:
    _WORKING_DIRECTORY_PATH: str = os.path.dirname(os.path.abspath(__file__)).replace('\\', '/')
    _BASE_PATH: str = os.path.dirname(_WORKING_DIRECTORY_PATH)
    _BUDGET_ANALYSER_BE_PATH: str = os.path.dirname(_BASE_PATH)
    _BACKEND_FOLDER_PATH: str = os.path.dirname(_BUDGET_ANALYSER_BE_PATH)
    PROJECT_PATH: str = os.path.dirname(_BACKEND_FOLDER_PATH)
    _FRONTEND_FOLDER_PATH: str = PROJECT_PATH + "/FRONTEND"
    TEMPLATE_PATH: str = _FRONTEND_FOLDER_PATH + "/templates"
    STATIC_PATH: str = _FRONTEND_FOLDER_PATH + "/static"