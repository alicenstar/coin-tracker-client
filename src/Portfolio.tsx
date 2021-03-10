import React from "react";
import { NewTransactionForm } from "./NewTransactionForm";
import { HoldingsTable } from "./HoldingsTable";
import {
    Card,
    CardContent,
    CardHeader,
    Collapse,
    Container,
    IconButton,
    makeStyles,
    Paper,
    Theme,
    Typography
} from "@material-ui/core";
import { useTrackerContext } from "./TrackerContext";
import { useListingsContext } from "./ListingsContext";
import { IHolding, IListing } from "./types/types";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import clsx from "clsx";
import { PortfolioTreemap }  from './PortfolioTreemap';


const useStyles = makeStyles((theme: Theme) => ({
    paper: {
        padding: 8,
        marginTop: 8,
        marginBottom: 24,
        borderColor: theme.palette.secondary.main,
    },
    root: {
        width: '100%',
        backgroundColor: 'transparent',
    },
    header: {
        padding: 0,
        marginLeft: 2,
        marginRight: 5,
    },
    content: {
        paddingTop: 0,
        paddingRight: 0,
        paddingLeft: 0,
        "&:last-child": {
            paddingBottom: 16
        }
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
          duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    button : {
        padding: 0
    },
}));

export const Portfolio: React.FC = () => {
    const { tracker } = useTrackerContext()!;
    const { listings } = useListingsContext()!;
    const [ tableData, setTableData ] = React.useState<any>([]);
    const classes = useStyles();
    const [ loaded, setLoaded ] = React.useState(false);
    const [ treemapData, setTreemapData ] = React.useState<any>([]);
    const [ expanded, setExpanded ] = React.useState(
        tracker && tracker?.holdings.length > 0
    );
    const [dimensions, setDimensions] = React.useState({
        width: 0,
        height: 0
    });

    const ref = React.useCallback((node) => {
        const observer = new ResizeObserver((entries: any) => {
            const { height, width } = entries[0].contentRect;
            setDimensions({
                width: width,
                height: height,
            });
        });
        if (node) {
            observer.observe(node);
        }
        return () => {
            observer.unobserve(node);
        };
    }, []);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const createTableData = React.useCallback(() => {
        setLoaded(false);
        let tblData = tracker!.holdings.map((holding: IHolding) => {
            const listingMatch: IListing | undefined = listings.find(listing => listing.id === holding.coinId);
            return {
                id: holding._id,
                listing: listingMatch,
                quantity: parseFloat(holding.quantity),
                totalValue: parseFloat(holding.quantity) * listingMatch!.quote.USD.price,
            }
        });
        tblData.sort(function(a: any, b: any) { return b.totalValue - a.totalValue });
        setTableData(tblData);

        let mapData = tracker!.holdings.map((holding: IHolding) => {
            const listingMatch: IListing | undefined = listings.find(listing => listing.id === holding.coinId);
            return {
                category: 'Portfolio',
                name: listingMatch!.symbol,
                value: parseFloat(holding.quantity) * listingMatch!.quote.USD.price,
            }
        });

        setTreemapData({
            name: 'Portfolio Treemap',
            children: mapData
        });

        setLoaded(true);
    }, [listings, tracker])

    React.useEffect(() => {
        createTableData();
    }, [createTableData, listings, tracker]);

    return (
        <div className="portfolio-container">
            {tracker && tracker
                ? (
                    <Container disableGutters>
                        <Typography variant="h4">
                            {tracker.name}
                        </Typography>
                        <Card className={classes.root}>
                            <CardHeader
                             className={classes.header}
                             title="Portfolio Breakdown"
                             action={
                                <IconButton
                                 className={clsx(classes.expand, {
                                    [classes.expandOpen]: expanded,
                                 }, classes.button)}
                                 onClick={handleExpandClick}
                                 aria-expanded={expanded}
                                 aria-label="show graph"
                                >
                                    <ExpandMoreIcon />
                                </IconButton>
                            }
                             titleTypographyProps={{
                                variant: 'subtitle1'
                             }}
                            />
                            
                            <Collapse
                             className={classes.root}
                             in={expanded}
                             timeout="auto"
                             mountOnEnter
                             unmountOnExit
                            >
                                <CardContent className={classes.content}>
                                    <div
                                     style={{ height: '300px', width: '100%' }}
                                     ref={ref}
                                    >
                                        {loaded && tracker.holdings.length > 0 &&
                                            <PortfolioTreemap
                                             data={treemapData}
                                             height={dimensions.height}
                                             width={dimensions.width}
                                             key={listings[0].quote.USD.market_cap}
                                            />
                                        }
                                    </div>
                                </CardContent>
                            </Collapse>
                        </Card>
                        <Paper
                         className={classes.paper}
                         elevation={7}
                         variant="outlined"
                        >
                            <NewTransactionForm />
                        </Paper>
                        {tableData.length > 0 &&
                            <HoldingsTable
                             data={tableData}
                             headers={[
                                "Coin Name",
                                "Market Price",
                                "1hr",
                                "24hr",
                                "Quantity",
                                "Value"
                             ]}
                            />
                        }
                            
                    </Container>
                ) : (
                    'Tracker Not Found'
                )
            }
        </div>
    );
};