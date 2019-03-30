# from flask import Flask
# app = Flask(__name__)


# @app.route('/')
# def hello_world():
#     return 'Hello, World!'


# if __name__ == '__main__':
#     app.run(debug=True)


from flask import Flask
app = Flask(__name__)

import io
import random
from flask import Response
from matplotlib.backends.backend_agg import FigureCanvasAgg as FigureCanvas
from matplotlib.figure import Figure
from kernel import gen_plt


@app.route('/plot.png')
def plot_png():
    fig = gen_plt()
    output = io.BytesIO()
    FigureCanvas(fig).print_png(output)
    return Response(output.getvalue(), mimetype='image/png')


# def create_figure():
#     fig = Figure()
#     axis = fig.add_subplot(1, 1, 1)
#     xs = range(100)
#     ys = [random.randint(1, 50) for x in xs]
#     axis.plot(xs, ys)
#     return fig


if __name__ == '__main__':
    app.run(debug=True)
