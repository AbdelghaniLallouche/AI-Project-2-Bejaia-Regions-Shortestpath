from flask import Flask, request
import osmnx as ox
import matplotlib.pyplot as plt
import networkx as nx
from flask_cors import CORS
app = Flask(__name__)
CORS(app)

@app.route('/calculate_shortest_path', methods=['POST'])
def calculate_shortest_path():
    data = request.json
    so = data['source']
    de = data['target']
    source = (so[0], so[1])
    target = (de[0], de[1])
    graph = ox.graph_from_place('Bejaia , Algeria', network_type='drive')
    ox.save_graphml(graph, 'graph.graphml')
    fig, ax = ox.plot_graph(graph, show=False)
    plt.savefig('graph.png')
    graph = ox.load_graphml('graph.graphml')

    source_node = ox.distance.nearest_nodes(graph, source[1], source[0])
    target_node = ox.distance.nearest_nodes(graph, target[1], target[0])
    shortest_path = nx.astar_path(graph, source_node, target_node, weight='length')
    fig , ax = ox.plot_graph_route(graph, shortest_path, show=False, close=False, edge_color='black', edge_linewidth=1, node_size=0)
    ax.scatter(source[1], source[0], c='green', s=100 , zorder=2)
    ax.scatter(target[1], target[0], c='red', s=100 , zorder=2)
    plt.savefig('../front/src/sp.png')
    #add the target node to the shortest path
    #add the source node to the shortest path in the first position
    #convert the elements of the shortest path to a list of tuples
    #shortest_path = [(graph.nodes[node]['y'], graph.nodes[node]['x']) for node in shortest_path]
    #shortest_path.insert(0, [source[0], source[1]])
    #shortest_path.append([target[0], target[1]])
    return {'shortest_path': shortest_path 
    }

if __name__ == '__main__':
    app.run(debug=True)

